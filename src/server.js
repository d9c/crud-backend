import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
const dbUri = process.env.DB_URI;

app.use(json());
app.use(cors());

app.use("/users", userRoutes);

mongoose
  .connect(dbUri)
  .then(() => {
    app.listen(port);
    console.log(`App listening on port ${port}`);
  })
  .catch((err) => console.error(err));
