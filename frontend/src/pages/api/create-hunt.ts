import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import convertImage from "@/utils/convertImage";
import runMiddleware from "@/utils/runMiddleware";
import slugify from "@/utils/slugify";
import { getSimpleAccount } from "@/utils/getSimpleAccount";
import { ethers, utils } from "ethers";
import dotenv from "dotenv";
import { HZH_ADDRESS, SIMPLE_ACCOUNT_FACTORY, ENTRY_POINT } from "../../../../config.js";
import {FireblocksSDK, PeerType, TransactionOperation} from "fireblocks-sdk";
import {formatEther, formatUnits} from "ethers/lib/utils";

dotenv.config();

const RPC_SERVER: string = process.env.RPC_SERVER!;

// First we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB (adjust as needed)
  },
});

export default async function handler(req: any, res: any) {
  try {
    await runMiddleware(req, res, upload.single("photo"));

    const modifiedReq: any = req;
    console.log("modifiedReq.body: ", modifiedReq.body);

    const file = modifiedReq.file;

    // Check if the file is a valid image file
    if (!file || !file.mimetype.includes("image/")) {
      throw new Error("Invalid image file");
    }

    // Convert the image to a grayscale 28x28 image and get an array of floating point values
    const imageArray = await convertImage(file.buffer);

    // Encrypt the image array
    // const imageArrayString = JSON.stringify(imageArray);
    // const key = crypto.randomBytes(32);
    // const iv = crypto.randomBytes(16);
    // const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(process.env.ENCRYPTION_KEY!), iv);
    // let encryptedImageString = cipher.update(imageArrayString, "utf8", "hex");
    // encryptedImageString += cipher.final("hex");

    // Execute RPC Forward request
    const rpcForwardParams = {
      jsonrpc: "2.0",
      method: "forward",
      params: [
        {
          input_data: [imageArray],
          input_shapes: [[1, 28, 28]],
          output_data: [
            [
              0.01953125, 0.01171875, 0.109375, 0.16015625, 0.15234375, 0.01953125, 0.0390625, 0.1640625, -0.08203125,
              -0.04296875,
            ],
          ],
        },
      ],
      id: 1,
    };
    // console.log("rpcForwardParams: ", JSON.stringify(rpcForwardParams));
    const forwardOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rpcForwardParams),
    };
    let forwardOutput = null;
    try {
      const forwardResponse = await fetch(RPC_SERVER, forwardOptions);
      const forwardData = await forwardResponse.json();
      forwardOutput = forwardData.result.output_data[0];
    } catch (error) {
      console.error("RPC error: ", error);
    }
    console.log("RPC Forward response :", forwardOutput);

    // Format contract parameters
    const huntId: string = slugify(req.body.name);
    const name: string = req.body.name;
    const prize: any = ethers.utils.parseEther(req.body.prize);
    const endTime: number = Date.parse(req.body.endTime) / 1000;
    const target = forwardOutput; //encryptedImageString.substring(0, 64); // substring temporarily to avoid gas fees
    console.log("target: ", target);

    // RELAYER: Call contract to add hunt
    // const hzhAbi = require("../../../abis/HunterZHunter.json").abi;
    // const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_PROVIDER_URL);
    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    // const hzhContract = new ethers.Contract(HZH_ADDRESS, hzhAbi, wallet);
    // await hzhContract.addHunt(huntId, name, endTime, target.toString(), { value: prize }).then((t: any) => t.wait());

    // ACCOUNT ABSTRACTION: Call contract to add hunt
    const hzhAbi = require("../../../abis/HunterZHunter.json").abi;
    const hzhInterface = new ethers.utils.Interface(hzhAbi);
    const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_PROVIDER_URL);
    // const signer = ethers.Wallet.createRandom(); // We can't do this because we can't any longer pass the smart wallet address into
    // const owner = new ethers.Wallet(signer, provider);
    const simpleAccountApi = getSimpleAccount(provider, process.env.PRIVATE_KEY!, ENTRY_POINT, SIMPLE_ACCOUNT_FACTORY);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    const hzhContract = new ethers.Contract(HZH_ADDRESS, hzhAbi, wallet);

    // Choose the right api url for your workspace type
    const fireblocks = new FireblocksSDK(process.env.FIREBLOCKS_API_SECRET!, process.env.FIREBLOCKS_API_KEY!, "https://sandbox-api.fireblocks.io");
    const transaction = await hzhContract.populateTransaction.addHunt(huntId, name, endTime, target.toString(), { value: prize });
    const { id, status } = await fireblocks.createTransaction({
      operation: TransactionOperation.CONTRACT_CALL,
      assetId: "MATIC_POLYGON_MUMBAI",
      source: {
        type: PeerType.VAULT_ACCOUNT,
        id: "2"
      },
      gasPrice: transaction.gasPrice != undefined ? formatUnits(transaction.gasPrice.toString(), "gwei") : undefined,
      gasLimit: transaction.gasLimit?.toString(),
      destination: {
        type: PeerType.ONE_TIME_ADDRESS,
        id: "",
        oneTimeAddress: {
          address: transaction.to!
        }
      },
      note: '',
      amount: formatEther(transaction.value?.toString() || "0"),
      extraParameters: {
        contractCallData: transaction.data
      }
    });
    console.log(`Fireblocks: ${id}, ${status}`);

    // Success
    res.status(200).json({ result: "success" });
  } catch (error: any) {
    // Send an error response if there is an error
    res.status(500).json({ error: error!.message });
  }
}
