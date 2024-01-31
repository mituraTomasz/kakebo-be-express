import { Router } from "express";
import { User } from "./../schemas/user.schema.mjs";
import { hashPassword } from "../utils/helpers.mjs";
import { verifyToken } from "./../middlewares/verifyToken.mjs";
import jwt from "jsonwebtoken";
import passport from "passport";

export const userRouter = Router();

// **Verify token**
userRouter.get("/auth/user/verify", verifyToken, async (req, res) => {
  const user = req.user;

  res.status(200).send({ user });
});

// **Login - passport**
userRouter.post("/auth/user/login", passport.authenticate("local"), (req, res) => {
  const token = jwt.sign(
    {
      username: req.user.username,
      email: req.user.email,
      id: req.user._id.toString(),
    },
    "secret-key",
    { expiresIn: "1h" }
  );

  return res.status(200).send({
    token,
    username: req.user.username,
    email: req.user.email,
    id: req.user._id.toString(),
  });
});

// **REGISTER**
userRouter.post("/auth/user/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(401).send({ msg: "username aleady used!" });
    } else {
      const hashedPassword = hashPassword(password);
      console.log("hashed", hashedPassword);

      const newUser = new User({
        username,
        password: hashedPassword,
        email,
      });

      const savedUser = await newUser.save();

      return res.status(200).send(savedUser);
    }
  } catch (err) {
    return res.status(500).send({ msg: err.message });
  }
});

// **LOGOUT**
userRouter.post("/auth/user/logout", (req, res) => {
  console.log("logging out...");

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Brak tokenu uwierzytelniającego." });
  }

  jwt.verify(token, "secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Błąd weryfikacji tokenu." });
    }

    res.status(200).json({ message: "Wylogowano pomyślnie." });
  });
});

// **PROFILE**
userRouter.get("/api/user/profile", (req, res) => {
  if (req.isAuthenticated()) {
    // Użytkownik jest zalogowany, możesz uzyskać dostęp do danych z req.user
    res.json({ user: req.user });
  } else {
    // Użytkownik nie jest zalogowany
    res.sendStatus(401);
  }
});

/* NOTE */
/*
User.findOne zwraca obiekt Query,  który jest obiektową reprezentacją zapytania, ale nie wykonuje go od razu. Aby uruchomić zapytanie i uzyskać wynik, musisz użyć metod takich jak exec() lub then()
   
**Przykład z użyciem then():   
User.findOne({ email })
  .then(user => {
    console.log("findOne", user);
  })
  .catch(error => {
    console.error("Error during findOne:", error);
  });


**Przykład z użyciem async/await:
try {
  const user = await User.findOne({ email });
  console.log("findOne", user);
} catch (error) {
  console.error("Error during findOne:", error);
}
*/
