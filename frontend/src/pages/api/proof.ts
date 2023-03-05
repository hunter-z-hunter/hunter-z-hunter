import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("req.body: ", req.body);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: (error as any).message });
  }
}
