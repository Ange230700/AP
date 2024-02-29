// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

const argon2 = require("argon2");

// Import database client
const database = require("./database/client");

// * Import fake products data
const products = require("./src/services/products");

async function insertProducts() {
  try {
    const queries = [];
    for (let i = 0; i < products.length; i += 1) {
      const { name, description, price, stock_quantity } = products[i];

      queries.push(
        database.query(
          "INSERT INTO `Product` (`name`, `description`, `price`, `stock_quantity`) VALUES (?, ?, ?, ?)",
          [name, description, price, stock_quantity]
        )
      );
    }
    await Promise.all(queries);
  } catch (error) {
    console.error("Error inserting products:", error.message);
    throw error;
  }
}

async function insertUser() {
  try {
    const password = "password";
    const hashedPassword = await argon2.hash(password);
    const randomDate = faker.date.past().toISOString().split("T")[0];
    const randomGender = faker.helpers.arrayElement([0, 1]);

    await database.query(
      "INSERT INTO `User` (`username`, `email`, `hashed_password`, `birthdate`, `gender`) VALUES (?, ?, ?, ?, ?)",
      ["username", "email@gmail.com", hashedPassword, randomDate, randomGender]
    );
  } catch (error) {
    console.error("Error inserting user:", error.message);
    throw error;
  }
}

async function insertAdmin() {
  try {
    const password = "admin";
    const hashedPassword = await argon2.hash(password);
    const randomDate = faker.date.past().toISOString().split("T")[0];
    const randomGender = faker.number.binary();

    await database.query(
      "INSERT INTO `User` (`username`, `email`, `hashed_password`, `birthdate`, `gender`, `is_admin`) VALUES (?, ?, ?, ?, ?, ?)",
      ["admin", "amdin@gmail.com", hashedPassword, randomDate, randomGender, 1]
    );
  } catch (error) {
    console.error("Error inserting admin:", error.message);
    throw error;
  }
}

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    // const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)
    await database.query("SET FOREIGN_KEY_CHECKS = 0");
    await database.query("TRUNCATE TABLE `Product`");
    await database.query("TRUNCATE TABLE `User`");

    // Insert fake data into the 'item' table
    await insertProducts();
    await insertUser();
    await insertAdmin();

    // Verify the insertion
    // const [productsRowsCount] = await database.query(
    //   "SELECT COUNT(*) AS count FROM `Product`"
    // );

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    // await Promise.all(queries);

    // Close the database connection
    // database.end();

    await database.query("SET FOREIGN_KEY_CHECKS = 1");

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (error) {
    console.error("Error filling the database:", error.message);
  } finally {
    // Close the database connection
    database.end();
  }
};

// Run the seed function
seed();
