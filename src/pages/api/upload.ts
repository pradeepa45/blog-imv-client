import { v2 as cloudinary } from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { image } = req.body;
    try {
      const uploadedResponse = await cloudinary.uploader.upload(image, {});
      res.status(200).json({ url: uploadedResponse.secure_url });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Upload failed", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
