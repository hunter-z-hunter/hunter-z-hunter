import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import convertImage from "../../utils/convertImage";

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
      res.status(200).json(values.length);
    });
  } catch (error: any) {
    // Send an error response if there is an error
    res.status(500).json({ error: error!.message });
  }
}
