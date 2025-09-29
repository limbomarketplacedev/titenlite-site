import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  // Save emails to a local text file (Vercel note: this is ephemeral storage)
  const filePath = path.join(process.cwd(), "emails.txt");
  fs.appendFileSync(filePath, `${email}\n`);

  return res.status(200).json({ message: "Thanks! You’re on the list." });
}
