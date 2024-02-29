const argon = require("argon2");
const jwt = require("jsonwebtoken");

const hashPassword = async (request, response, next) => {
  try {
    const { password } = request.body;

    if (!password) {
      const error = new Error("Password is undefined");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await argon.hash(password);

    request.body.hashed_password = hashedPassword;

    delete request.body.password;

    next();
  } catch (error) {
    next(error);
  }
};

const verifyToken = (request, response, next) => {
  try {
    const authorizationHeader = request.get("Authorization");

    if (!authorizationHeader) {
      return response.status(401).send({ error: "No token provided" });
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      return response.status(401).send({ error: "Invalid token type" });
    }

    const { APP_SECRET } = process.env;
    request.authentication = jwt.verify(token, APP_SECRET);
    console.warn(
      "request.authentication in backend\\src\\services\\auth.js => ",
      request.authentication
    );

    next();
  } catch (error) {
    console.error("Error verifying token: ", error.message);

    if (error.message === "jwt expired") {
      response.status(401).json({ error: "Token expired" });
    }
  }

  return null;
};

module.exports = { hashPassword, verifyToken };
