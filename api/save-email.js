import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    try {
      const filePath = path.join(process.cwd(), "emails.txt");
      fs.appendFileSync(filePath, email + "\n");
      res.status(200).json({ message: "✅ Thanks for signing up!" });
    } catch (err) {
      res.status(500).json({ message: "❌ Error saving email." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
