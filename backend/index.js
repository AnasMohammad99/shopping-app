import express from "express";
import productRouter from "./routes/product-routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const corsoptions = { credentials: true, origin: process.env.URL || "*" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsoptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.get("/product-image/:filename", (req, res) => {
//   const filename = req.params.filename;
//   const imagePath = path.join(__dirname, "uploads", filename);

//   // Check if file exists (optional)
//   if (fs.existsSync(imagePath)) {
//     res.sendFile(imagePath);
//   } else {
//     res.status(404).send("Image not found");
//   }
// });
//-------------------------------------

app.get("/health", (req, res) => {
  res.send("hello");
});
app.use("/api/v1/product", productRouter);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
export default app;
