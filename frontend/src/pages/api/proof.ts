import { NextApiRequest, NextApiResponse } from "next";
import getGasFee from "@/utils/getGasFee";
import { printOp } from "@/utils/opUtils";
import { getSimpleAccount } from "@/utils/getSimpleAccount";
import { ethers, utils } from "ethers";
import { HZH_ADDRESS, SIMPLE_ACCOUNT_FACTORY, ENTRY_POINT } from "../../../../config.js";
import { HttpRpcClient } from "@account-abstraction/sdk";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("req.body: ", req.body);

    // Format contract parameters
    const { huntId, address } = req.body;

    // ACCOUNT ABSTRACTION: Call contract to verify proof
    const hzhAbi = require("../../../abis/HunterZHunter.json").abi;
    // const hzhInterface = new ethers.utils.Interface(hzhAbi);
    const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_PROVIDER_URL);
    const simpleAccountApi = getSimpleAccount(provider, process.env.PRIVATE_KEY!, ENTRY_POINT, SIMPLE_ACCOUNT_FACTORY);
    const op = await simpleAccountApi.createSignedUserOp({
      target: HZH_ADDRESS,
      value: 0,
      data: "0x", //hzhInterface.encodeFunctionData("addHunt", [huntId, name, endTime, target.toString()]), // const encodedProof = defaultAbiCoder.encode(['uint256[8]', 'uint256', 'uint256', 'bytes32', 'uint256'], [solidityProof,group.root,nullifierHash,signalBytes32,externalNullifier])
      ...(await getGasFee(provider)),
    });
    console.log(`Signed UserOperation: ${await printOp(op)}`);
    const chainId = await provider.getNetwork().then((net) => net.chainId);
    const client = new HttpRpcClient(process.env.BUNDLER_URL!, ENTRY_POINT, chainId);
    const uoHash = await client.sendUserOpToBundler(op);
    console.log(`UserOpHash: ${uoHash}`);
    console.log("Waiting for transaction...");
    const txHash = await simpleAccountApi.getUserOpReceipt(uoHash);
    console.log(`Transaction hash: ${txHash}`);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: (error as any).message });
  }
}
