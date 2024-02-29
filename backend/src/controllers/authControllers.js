const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const tables = require("../tables");

const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const [user] = await tables.User.readByEmail(email);
    if (!user) {
      return response
        .status(422)
        .json({ message: "Invalid email or password" });
    }

    if (email && password) {
      const validPassword = await argon2.verify(user.hashed_password, password);

      if (!validPassword) {
        return response
          .status(422)
          .json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ sub: user.id }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });
      return response
        .status(200)
        .json({ token, message: "Logged in successfully", sub: user.id });
    }

    return response.status(422).json({ message: "email or password missing" });
  } catch (error) {
    console.error("Error logging in:", error.message);
    response
      .status(500)
      .send({ error: `Internal server error: ${error.message}` });
    next(error);
  }

  return null;
};

module.exports = {
  login,
};
