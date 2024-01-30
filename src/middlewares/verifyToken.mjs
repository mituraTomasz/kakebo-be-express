import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ msg: "No token provided" });
  }

  try {
    const decodedUser = jwt.verify(token, "secret-key");
    req.user = decodedUser;
    next();
  } catch (err) {
    res.status(401).send({ msg: "Token is not valid" });
  }
};
