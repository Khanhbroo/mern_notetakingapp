import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import notesRouter from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json()); // This middleware will parse JSON body: req.body

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Limit the request
app.use(rateLimiter);

// Simple custome middleware
app.use((req, res, next) => {
  console.log(`Request method is ${req.method} & request URL is ${req.url}`);
  next();
});

app.use("/api/notes", notesRouter);

// Connect to MG server
await connectDB();

app.listen(port, () => {
  console.log("Server is opening on PORT", port);
});
