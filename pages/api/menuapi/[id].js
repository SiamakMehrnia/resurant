// pages/api/menu/[id].js

import dbConnect from "@/lib/connect";
import MenuItem from "@/models/index";
import cloudinary from "@/lib/cloudinary";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const item = await MenuItem.findById(id);
        if (!item)
          return res
            .status(404)
            .json({ success: false, message: "Item not found" });
        return res.status(200).json({ success: true, data: item });
      } catch (error) {
        console.error("GET Error:", error);
        return res
          .status(500)
          .json({ success: false, message: "Server Error" });
      }

    case "PUT":
      try {
        const form = formidable({ multiples: false });

        const { fields, files } = await new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
          });
        });

        console.log("Full Fields Object:", fields);
        console.log("Full Files Object:", files);
        const file = files.image ? files.image[0] : null;
        console.log("Received file:", file);
        console.log("File path:", file ? file.filepath : "No file received");
        const existingItem = await MenuItem.findById(id);
        if (!existingItem)
          return res.status(404).json({ success: false, message: "Item not found" });

        const name = fields.name ? fields.name[0] : existingItem.name;
        const price = fields.price ? parseFloat(fields.price[0]) : existingItem.price;
        const category = fields.category ? fields.category[0] : existingItem.category;
        const description = fields.description ? fields.description[0] : existingItem.description;

   const available = Array.isArray(fields.available)
  ? fields.available[0] === "true"
  : fields.available === "true";
        console.log("Received available:", available);

        let imageUrl = existingItem.image;
        let publicId = existingItem.public_id;

        if (file) {
          console.log("Updating image in Cloudinary...");
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
          const uploadResponse = await cloudinary.uploader.upload(
            file.filepath,
            {
              folder: "resturant",
            }
          );
          imageUrl = uploadResponse.secure_url;
          publicId = uploadResponse.public_id;
        }

        const updatedItem = await MenuItem.findByIdAndUpdate(
          id,
          {
            name,
            price,
            category,
            description,
            available,
            image: imageUrl,
            public_id: publicId,
          },
          { new: true, runValidators: true }
        );

        return res.status(200).json({ success: true, data: updatedItem });
      } catch (error) {
        console.error("PUT Error:", error);
        return res
          .status(500)
          .json({ success: false, message: "Server Error" });
      }

    case "DELETE":
      try {
        const deletedItem = await MenuItem.findByIdAndDelete(id);
        if (!deletedItem)
          return res
            .status(404)
            .json({ success: false, message: "Item not found" });

        if (deletedItem.public_id) {
          await cloudinary.uploader.destroy(deletedItem.public_id);
        }

        return res
          .status(200)
          .json({ success: true, message: "Item and image deleted" });
      } catch (error) {
        console.error("DELETE Error:", error);
        return res
          .status(500)
          .json({ success: false, message: "Server Error" });
      }

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
// pages/api/menu/[id].js
