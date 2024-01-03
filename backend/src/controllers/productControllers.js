const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // % Fetch all products from the database
    const products = await tables.Product.readAll();

    // Respond with the products in JSON format
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific product from the database based on the provided ID
    const product = await tables.Product.read(req.params.id);

    // If the product is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the product in JSON format
    if (product == null) {
      res.sendStatus(404);
    } else {
      res.json(product);
    }
  } catch (error) {
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (req, res, next) => {
  // Extract the product data from the request body
  const product = req.body;

  try {
    // Update the product in the database
    const updateId = await tables.Product.update(product);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted product
    res.status(201).json({ updateId });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  // Extract the product data from the request body
  const product = req.body;

  try {
    // Insert the product into the database
    const insertId = await tables.Product.create(product);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted product
    res.status(201).json({ insertId });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (req, res, next) => {
  try {
    // Delete the product from the database
    const deleteId = await tables.Product.delete(req.params.id);

    // Respond with HTTP 200 (OK) and the ID of the deleted product
    res.status(200).json({ deleteId });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
