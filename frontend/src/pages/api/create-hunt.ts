import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import convertImage from "@/utils/convertImage";
import runMiddleware from "@/utils/runMiddleware";
import slugify from "@/utils/slugify";
import { ethers, utils } from "ethers";
import dotenv from "dotenv";
import crypto from "crypto";
import { HZH_ADDRESS } from "../../../../config.js";

dotenv.config();

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
    const imageArrayString = JSON.stringify(imageArray);
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(process.env.ENCRYPTION_KEY!), iv);
    let encryptedImageString = cipher.update(imageArrayString, "utf8", "hex");
    encryptedImageString += cipher.final("hex");

    // Format contract parameters
    const huntId: string = slugify(req.body.name);
    const name: string = req.body.name;
    const prize: any = ethers.utils.parseEther(req.body.prize);
    const endTime: number = Date.parse(req.body.endTime) / 1000;
    const target = encryptedImageString.substring(0, 64); // substring temporarily to avoid gas fees

    // Call contract to add hunt
    const hzhAbi = require("../../../abis/HunterZHunter.json").abi;
    const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_PROVIDER_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    const hzhContract = new ethers.Contract(HZH_ADDRESS, hzhAbi, wallet);
    await hzhContract.addHunt(huntId, name, endTime, target, { value: prize }).then((t: any) => t.wait());

    // Success
    res.status(200).json({ result: "success" });
  } catch (error: any) {
    // Send an error response if there is an error
    res.status(500).json({ error: error!.message });
  }
}
