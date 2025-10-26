// server.js
import express from "express";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: "uploads/" });

// serve i file statici (HTML, CSS, JS)
app.use(express.static(__dirname));

// rotta per inviare la mail
app.post("/send-email", upload.single("file"), async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    // configurazione trasporto email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "servizioravio12@gmail.com",
        pass: "jvet cgfr wcok hlrx" // usa una App Password di Gmail
      }
    });

    const mailOptions = {
      from: "servizioravio12@gmail.com",
      to,
      subject,
      text: message,
      attachments: req.file ? [{
        filename: req.file.originalname,
        path: req.file.path
      }] : []
    };

    await transporter.sendMail(mailOptions);

    if (req.file) fs.unlinkSync(req.file.path); // cancella allegato temporaneo

    res.send("✅ Email inviata con successo!");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Errore nell'invio dell'email.");
  }
});

app.listen(3000, () => console.log("Server avviato su http://localhost:3000"));
