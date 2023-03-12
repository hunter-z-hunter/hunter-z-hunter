import { NextApiRequest, NextApiResponse } from "next";
import getGasFee from "@/utils/getGasFee";
import { printOp } from "@/utils/opUtils";
import { getSimpleAccount } from "@/utils/getSimpleAccount";
import { ethers, utils } from "ethers";
import { TESTBUNDLER_ADDRESS, SIMPLE_ACCOUNT_FACTORY, ENTRY_POINT } from "../../../../config.js";
import { HttpRpcClient } from "@account-abstraction/sdk";
const { defaultAbiCoder } = ethers.utils;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req.body: ", req.body);

  const testId = req.body.testId;

  const testBundlerAbi = require("../../../abis/TestBundler.json").abi;
  const testBundlerInterface = new ethers.utils.Interface(testBundlerAbi);
  const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_PROVIDER_URL);
  const simpleAccountApi = getSimpleAccount(provider, process.env.PRIVATE_KEY!, ENTRY_POINT, SIMPLE_ACCOUNT_FACTORY);
  const chainId = await provider.getNetwork().then((net) => net.chainId);
  const client = new HttpRpcClient(process.env.BUNDLER_URL!, ENTRY_POINT, chainId);
  let uoHash, txHash, op, testParam, huntId, winner, proof;

  switch (testId) {
    case 1:
      console.log("testId: ", testId);
      ({ testParam } = req.body);
      op = await simpleAccountApi.createSignedUserOp({
        target: TESTBUNDLER_ADDRESS,
        value: 0,
        data: testBundlerInterface.encodeFunctionData("testBundler1", [testParam]),
        ...(await getGasFee(provider)),
      });
      // op.preVerificationGas = 130800; //10000000;
      console.log(`Signed UserOperation: ${await printOp(op)}`);
      break;
    case 2:
      console.log("testId: ", testId);
      ({ testParam } = req.body);
      op = await simpleAccountApi.createSignedUserOp({
        target: TESTBUNDLER_ADDRESS,
        value: 0,
        data: testBundlerInterface.encodeFunctionData("verifyAndAwardPrize", [testParam]),
        ...(await getGasFee(provider)),
      });
      // op.preVerificationGas = 130800; //10000000;
      break;
    case 3:
      console.log("testId: ", testId);
      ({ huntId, winner } = req.body);
      op = await simpleAccountApi.createSignedUserOp({
        target: TESTBUNDLER_ADDRESS,
        value: 0,
        data: testBundlerInterface.encodeFunctionData("verifyAndAwardPrize1", [huntId, winner]),
        ...(await getGasFee(provider)),
      });
      // op.preVerificationGas = 130800; //10000000;
      break;
    case 4:
      console.log("testId: ", testId);
      ({ huntId, winner, proof } = req.body);
      op = await simpleAccountApi.createSignedUserOp({
        target: TESTBUNDLER_ADDRESS,
        value: 0,
        data: testBundlerInterface.encodeFunctionData("verifyAndAwardPrize2", [huntId, winner, proof]),
        ...(await getGasFee(provider)),
      });
      //   op.preVerificationGas = 130800; //10000000;
      break;
    case 5:
      console.log("testId: ", testId);
      ({ huntId, winner, proof } = req.body);
      op = await simpleAccountApi.createSignedUserOp({
        target: TESTBUNDLER_ADDRESS,
        value: 0,
        data: testBundlerInterface.encodeFunctionData("verifyAndAwardPrize3", [huntId, winner, proof]),
        ...(await getGasFee(provider)),
      });
      //   op.preVerificationGas = 130800; //10000000;
      break;
  }

  console.log(`Signed UserOperation: ${await printOp(op)}`);
  uoHash = await client.sendUserOpToBundler(op);
  console.log(`UserOpHash: ${uoHash}`);
  console.log("Waiting for transaction...");
  txHash = await simpleAccountApi.getUserOpReceipt(uoHash);
  console.log(`Transaction hash: ${txHash}`);

  res.status(200).json({ message: "Success" });
}
