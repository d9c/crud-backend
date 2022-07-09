const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 4000;
const dbUri = process.env.DB_URI;

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

mongoose
  .connect(dbUri)
  .then(() => {
    app.listen(port);
    console.log(`App listening on port ${port}`);
  })
  .catch((err) => console.error(err));
