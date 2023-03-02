import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import convertImage from "@/utils/convertImage";
import runMiddleware from "@/utils/runMiddleware";
import { huntsDocument, huntsQuery, execute } from "../../../.graphclient";

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await runMiddleware(req, res, upload.single("photo"));

    const modifiedReq: any = req;
    console.log("modifiedReq.body: ", modifiedReq.body);

    const file = modifiedReq.file;

    // Check if the file is a valid image file
    if (!file || !file.mimetype.includes("image/")) {
      throw new Error("Invalid image file");
    }

    // Convert the image to a grayscale 28x28 image and return as an array of floating point values
    const values = await convertImage(file.buffer);

    // Grab target data from subgraph
    // await execute(huntsDocument, {id: });

    // Create response json
    // {
    //   address: modifiedReq.body.address,
    //   photo_input_data: values,
    //   target_input_data: [],
    // };

    // Execute RPC Forward request
    const rpcForwardParams = {
      jsonrpc: "2.0",
      method: "forward",
      params: [
        {
          input_data: [values],
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

    // Execute RPC Mock request
    const rpcMockParams = {
      jsonrpc: "2.0",
      method: "mock",
      params: [
        {
          input_data: [values],
          input_shapes: [[1, 28, 28]],
          output_data: [
            [
              0.01953125, 0.01171875, 0.109375, 0.16015625, 0.15234375, 0.01953125, 0.0390625, 0.1640625, -0.08203125,
              -0.04296875,
            ],
          ],
        },
        { target_output_data: [forwardOutput] },
      ],
      id: 2,
    };
    console.log("rpcMockParams: ", JSON.stringify(rpcMockParams));
    const mockOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rpcMockParams),
    };

    let mockOutput = null;
    try {
      const mockResponse = await fetch(RPC_SERVER, mockOptions);
      const mockData = await mockResponse.json();
      mockOutput = mockData.result;
      console.log("mockOutput: ", mockOutput);
      res.status(200).json({ result: mockOutput });
    } catch (error) {
      console.error("RPC error: ", error);
    }
    console.log("RPC Mock response :", mockOutput);

    // fetch(RPC_SERVER, mockOptions)
    //   .then((response) => response.json())
    //   .then((data) => res.status(200).json({ result: data }))
    //   .catch((error) => console.error("RPC error: ", error));

    // Success
    // res.status(200).json({ result: "success" });
  } catch (error: any) {
    res.status(500).json({ error: error!.message });
  }

  // try {
  //   // Use the Multer middleware to handle the file upload
  //   upload.single("photo")(req as any, res as any, async (error: any) => {
  //     if (error) {
  //       throw new Error(`Error parsing request: ${error.message}`);
  //     }

  //     const file = req.file;

  //     // Check if the file is a valid image file
  //     if (!file || !file.mimetype.includes("image/")) {
  //       throw new Error("Invalid image file");
  //     }

  //     // Convert the image to a grayscale 28x28 image and return as an array of floating point values
  //     const values = await convertImage(file.buffer);

  //     // Send the grayscale values as the response
  //     res.status(200).json(values.length);
  //   });
  // } catch (error: any) {
  //   // Send an error response if there is an error
  //   res.status(500).json({ error: error!.message });
  // }
}
