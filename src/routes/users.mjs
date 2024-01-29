import { Router } from "express";
import { User } from "./../schemas/user.schema.mjs";
import passport from "passport";
import { hashPassword, comparePassword } from "../utils/helpers.mjs";

export const userRouter = Router();

// LOGIN
// userRouter.post("/auth/user/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({
//       username,
//     });

//     console.log("user", user);

//     if (user === null) {
//       return res.status(401).send({ msg: "There is no user with that username!" });
//     }

//     if (comparePassword(password, user.password)) {
//       req.session.user = user;

//       return res.status(200).send({ msg: "Welcome " + user.username });
//     } else {
//       return res.status(401).send({ msg: "Bad password!" });
//     }
//   } catch (err) {
//     return res.status(500).send({ msg: err.message });
//   }
// });

// Login - passport
userRouter.post("/auth/user/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// REGISTER
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

// LOGOUT
userRouter.post("/auth/user/logout", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("User is logged in");
    req.logout((err) => {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }

      res.sendStatus(200);
    });
  } else {
    console.log("User is not logged in");
    res.status(401).send({ msg: "User is not logged in" });
  }
});

userRouter.get("/api/user/profile", (req, res) => {
  if (req.session.user) {
    // console.log("req.session.user", req.session.user);
  }

  return res.status(200).send({ msg: "OK" });
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
