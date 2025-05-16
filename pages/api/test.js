// pages/api/test.js

import dbConnect from "@/lib/connect";

export default async function handler(req, res) {
  try {
    await dbConnect();
    return res.status(200).json({ success: true, message: "Database connected successfully!" });
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({ success: false, message: "Database connection failed!" });
  }
}