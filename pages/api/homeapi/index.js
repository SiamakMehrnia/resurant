import cloudinary from '@/lib/cloudinary';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

// GET: دریافت لیست تصاویر
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { resources } = await cloudinary.search
          .expression('folder:resturant/home')
          .sort_by('created_at', 'desc')
          .max_results(20)
          .execute();

        const images = resources.map((file) => ({
          public_id: file.public_id,
          url: file.secure_url,
        }));

        return res.status(200).json({ success: true, data: images });
      } catch (error) {
        console.error("GET Error:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
      }

    case "POST":
      try {
        const form = formidable({ multiples: false });

        const { files } = await new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ files });
          });
        });

        const file = files.image ? files.image[0] : null;
        if (!file) {
          return res.status(400).json({ success: false, message: "File is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(file.filepath, {
          folder: "resturant/home",
        });

        return res.status(201).json({
          success: true,
          data: {
            public_id: uploadResponse.public_id,
            url: uploadResponse.secure_url,
          },
        });
      } catch (error) {
        console.error("POST Error:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
      }

    case "DELETE":
      try {
        const { public_id } = req.query;

        if (!public_id) {
          return res.status(400).json({ success: false, message: "Public ID is required" });
        }

        // حذف تصویر از Cloudinary
        await cloudinary.uploader.destroy(public_id);

        return res.status(200).json({ success: true, message: "Image deleted successfully" });
      } catch (error) {
        console.error("DELETE Error:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
      }
      
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}