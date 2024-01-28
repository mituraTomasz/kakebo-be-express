import express from "express";
import { router } from "./routes/index.mjs";
import mongoose from "mongoose";
import cors from "cors";

mongoose
  .connect("mongodb+srv://mitur5g:onlyProgrammers@cluster0.fkejnpl.mongodb.net/Kakebo")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
