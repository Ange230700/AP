/* eslint-disable camelcase */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)
    await database.query("TRUNCATE TABLE `Product`");

    // Insert fake data into the 'item' table
    for (let productRow = 0; productRow < 3; productRow += 1) {
      const image_url = faker.image.urlPicsumPhotos();
      const name = faker.commerce.productName();
      const description = faker.commerce.productDescription();
      const price = faker.commerce.price({
        min: 100,
        max: 999,
        dec: 2,
        symbol: "$",
      });
      const stock_quantity = faker.number.int({ min: 0, max: 1000 });

      queries.push(
        database.query(
          "INSERT INTO `Product` (`image_url`, `name`, `description`, `price`, `stock_quantity`) VALUES (?, ?, ?, ?, ?)",
          [image_url, name, description, price, stock_quantity]
        )
      );
    }

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
