import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import cors from "cors";
import passport from "passport";
import { router } from "./routes/index.mjs";
import "./stratgies/local.strategy.mjs";

const app = express();

// ustawienia MongoDB
mongoose
  .connect("mongodb+srv://mitur5g:onlyProgrammers@cluster0.fkejnpl.mongodb.net/Kakebo")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Ustawienia sesji
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Inicializacja middleware
app.use(cors());
app.use(express.json());
// Inicjalizacja Passport
app.use(passport.initialize());
app.use(passport.session());

// Inicjalizacja routes i odpalanie serwera
app.use(router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
