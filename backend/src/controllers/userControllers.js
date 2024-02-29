const argon2 = require("argon2");

const tables = require("../tables");

const browse = async (request, response, next) => {
  try {
    const arrayOfAllUsers = await tables.User.readAll();

    response.status(200).json(arrayOfAllUsers);
  } catch (error) {
    console.error("Error reading all users:", error);
    response
      .status(500)
      .send({ error: `Internal Server Error: ${error.message}` });
    next(error);
  }
};

// I am unable to get the sub from the token in the request.authentication object from backend\src\controllers\authControllers.js file. It should help me to get the user authenticated by the token and use them throughout the whole app. How can I fix this?

const readWithToken = async (request, response, next) => {
  const userInformation = request.authentication;
  console.warn(
    "userInformation in backend\\src\\controllers\\userControllers.js => ",
    userInformation
  );

  try {
    if (!userInformation.sub) {
      return response.status(401).send({ error: "Unauthorized" });
    }

    const arrayOfSpecificUser = await tables.User.read(userInformation.sub);

    if (!arrayOfSpecificUser) {
      return response.status(404).send({ error: "User not found" });
    }

    return response.status(200).json(arrayOfSpecificUser);
  } catch (error) {
    console.error("Error reading user:", error);
    response
      .status(500)
      .send({ error: `Internal Server Error: ${error.message}` });
    next(error);
  }

  return null;
};

const editWithToken = async (request, response, next) => {
  const userInformation = request.authentication;
  const {
    username,
    // email,
    current_password,
    new_password,
    // birthdate,
    gender,
    profile_picture_file,
  } = request.body;

  try {
    if (!userInformation.sub) {
      return response.status(401).send({ error: "Unauthorized" });
    }

    const currentUser = await tables.User.read(userInformation.sub);

    if (!currentUser) {
      return response.status(404).send({ error: "User not found" });
    }

    if (current_password && new_password) {
      const isPasswordValid = await argon2.verify(
        currentUser.hashed_password,
        current_password
      );

      if (!isPasswordValid) {
        return response.status(400).send({ error: "Invalid password" });
      }

      if (new_password.length < 8) {
        return response
          .status(400)
          .send({ error: "The password must be at least 8 characters long" });
      }

      request.body.hashed_password = await argon2.hash(new_password);
    }

    const updatedUser = await tables.User.update(userInformation.sub, {
      username,
      email, // eslint-disable-line
      hashed_password: request.body.hashed_password,
      birthdate, // eslint-disable-line
      gender,
      profile_picture_file,
    });

    if (!updatedUser) {
      return response.status(400).send({ error: "User not updated" });
    }

    return response
      .status(200)
      .send({ message: "Account updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    response
      .status(500)
      .send({ error: `Internal server error: ${error.message}` });
    next(error);
  }

  return null;
};

const add = async (request, response, next) => {
  try {
    const { username, email, hashed_password, birthdate, gender } =
      request.body;

    const [isAlreadyRegistered] = await tables.User.readByEmail(email);

    if (isAlreadyRegistered) {
      return response.status(422).send({ error: "Email already registered" });
    }

    if (!username || !email || !hashed_password || !birthdate) {
      if (!gender) {
        return response.status(400).send({ error: "Missing required fields" });
      }

      return response.status(400).send({ error: "Missing required fields" });
    }

    const createdUserId = await tables.User.create({
      username,
      email,
      hashed_password,
      birthdate,
      gender,
    });

    if (!createdUserId) {
      response.status(400).send({ error: "User not created" });
    } else {
      response.status(201).send({ message: "Account created successfully" });
    }
  } catch (error) {
    console.error("Error adding user:", error.message);
    response
      .status(500)
      .send({ error: `Internal server error: ${error.message}` });
    next(error);
  }

  return null;
};

const destroyWithToken = async (request, response, next) => {
  const userInformation = request.authentication;

  try {
    if (!userInformation.sub) {
      return response.status(401).send({ error: "Unauthorized" });
    }

    const affectedRows = await tables.User.delete(userInformation.sub);

    if (!affectedRows) {
      response.status(404).send({ error: "User not found" });
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    response
      .status(500)
      .send({ error: `Internal server error: ${error.message}` });
    next(error);
  }

  return null;
};

module.exports = {
  browse,
  readWithToken,
  editWithToken,
  add,
  destroyWithToken,
};
