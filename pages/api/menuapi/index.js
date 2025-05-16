// pages/api/menu/index.js

import dbConnect from '@/lib/connect';
import MenuItem from '@/models/index';
import cloudinary from '@/lib/cloudinary';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const items = await MenuItem.find({});
        return res.status(200).json({ success: true, data: items });
      } catch (error) {
        console.error('GET Error:', error);
        return res.status(500).json({ success: false, message: 'Server Error' });
      }

    case 'POST':
      try {
        console.log("Starting to parse form...");
        const form = formidable({ multiples: false, keepExtensions: true });

        const { fields, files } = await new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) {
              console.error("Form parse error:", err);
              reject(err);
            }
            resolve({ fields, files });
          });
        });

        console.log("Parsed Fields after processing:", fields);
        console.log("Parsed Files after processing:", files);

        const file = files.file ? files.file[0] : null;
        console.log("File path:", file ? file.filepath : "No file received");

        if (!fields.name || !fields.price || !fields.category) {
          console.error("Missing required fields: name, price, category");
          return res.status(400).json({ success: false, message: "Required fields are missing" });
        }

        if (!file) {
          console.error("File is missing in the request.");
          return res.status(400).json({ success: false, message: "File is required" });
        }

        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        const price = parseFloat(Array.isArray(fields.price) ? fields.price[0] : fields.price);
        const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
        const description = Array.isArray(fields.description) ? fields.description[0] : fields.description;
        const available = Array.isArray(fields.available) ? fields.available[0] === "true" : fields.available === "true";

        console.log("Received file:", file);
        console.log("Received name:", name);
        console.log("Cloudinary Upload Start...");

        let imageUrl = "";

        if (file) {
          console.log("Uploading to Cloudinary...");
          const uploadResponse = await cloudinary.uploader.upload(file.filepath, {
            folder: "resturant",
          });
          console.log("Cloudinary Response:", uploadResponse);
          imageUrl = uploadResponse.secure_url;
        }

        console.log("New Item Data:", {
          name,
          price,
          category,
          description,
          image: imageUrl,
          available,
        });

        const newItem = await MenuItem.create({
          name,
          price,
          category,
          description,
          image: imageUrl,
          available,
        });

        return res.status(201).json({ success: true, data: newItem });
      } catch (error) {
        console.error('POST Error:', error);
        return res.status(500).json({ success: false, message: 'Server Error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
// This code handles the menu API for a restaurant application.
