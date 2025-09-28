import express from "express";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

connectDB();
app.use(express.json());
app.use("/api/notes", notesRouter);

app.listen(port, () => {
  console.log("Server is opening on PORT", port);
});
