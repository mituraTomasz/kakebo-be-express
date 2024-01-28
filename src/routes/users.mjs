import { Router } from "express";
import { User } from "./../schemas/user.schema.mjs";
export const userRouter = Router();

userRouter.post("/auth/user/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const existingUser = await User.findOne({ email });

    console.log("existingUser", existingUser);

    if (existingUser) {
      return res.status(401).send({ msg: "Email aleady used!" });
    } else {
      const newUser = new User({
        username,
        password,
        email,
      });

      const savedUser = await newUser.save();
      console.log("savedUser", savedUser);
      return res.status(200).send(savedUser);
    }
  } catch (error) {
    return res.status(500).send({ msg: err.message });
  }
});

userRouter.post("/auth/user/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username,
      password,
    });

    if (user === null) {
      res.status(401).send({ msg: "Bad credentials!" });
    } else {
      res.status(200).send({ msg: "Welcome " + user.username });
    }
  } catch (error) {
    return res.status(500).send({ msg: err.message });
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
