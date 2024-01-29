import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../schemas/user.schema.mjs";
import { comparePassword } from "../utils/helpers.mjs";

passport.use(
  new Strategy(async (username, password, done) => {
    console.log("username", username);
    console.log("password", password);

    try {
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error("User not found");
      }
      if (!comparePassword(password, user.password)) {
        throw new Error("Invalid password");
      }

      done(null, user);
    } catch (err) {
      done(err, null);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("**serialize user**");
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  console.log("**deserialize user**");
  const activeUser = { username };
  done(null, activeUser);
});

/* Notes 
 passport.serializeUser - funkcja ta służy do zapisywania użytkownika do sesji po jego udanym zalogowaniu. W tym kontekście done(null, user.username) oznacza, że po zalogowaniu do sesji zostanie zapisana jedynie nazwa użytkownika (user.username).

*/
