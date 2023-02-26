import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import multer from "multer";
import sharp from "sharp";

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configure Multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB (increase as needed)
  },
});

export default async function handler(req: any, res: any) {
  // NextApiRequest, NextApiResponse
  try {
    // Use the Multer middleware to handle the file upload
    upload.single("photo")(req as any, res as any, async (error: any) => {
      if (error) {
        throw new Error(`Error parsing request: ${error.message}`);
      }

      const file = req.file;

      // Check if the file is a valid image file
      if (!file || !file.mimetype.includes("image/")) {
        throw new Error("Invalid image file");
      }

      // Convert the image to a grayscale 28x28 image and return as an array of floating point values
      const values = await convertImage(file.buffer);

      // Send the grayscale values as the response
      res.status(200).json(values);
    });
  } catch (error: any) {
    // Send an error response if there is an error
    res.status(500).json({ error: error!.message });
  }
}

async function convertImage(file: Buffer): Promise<number[]> {
  // Resize the image to 28x28 and convert to grayscale
  const image = await sharp(file).resize(28, 28).grayscale().toBuffer();

  // Convert the image buffer to a Float32Array of values in the range [0, 1]
  const values = new Float32Array(image.length);
  for (let i = 0; i < image.length; i++) {
    values[i] = image[i] / 255.0;
  }

  // Convert the Float32Array to a regular array and return it
  return Array.from(values);
}
