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
        const form = formidable({ multiples: false });
        
        const { fields, files } = await new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
          });
        });

        console.log("Parsed Fields:", fields);
        console.log("Parsed Files:", files);
        const file = files.image;
        const name = fields.name[0];
        const price = parseFloat(fields.price[0]);
        const category = fields.category[0];
        const description = fields.description[0];
        console.log("Received file:", file);
        console.log("Received name:", name);
        console.log("Cloudinary Upload Start...");
        if (!file) {
          return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(file[0].filepath, {
          folder: "resturant",
        });

        const newItem = await MenuItem.create({
          name,
          price,
          category,
          description,
          image: uploadResponse.secure_url,
          public_id: uploadResponse.public_id,
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
