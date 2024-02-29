const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (request, response, next) => {
  try {
    // % Fetch all products from the database
    const arrayOfAllProducts = await tables.Product.readAll();

    // Respond with the products in JSON format
    response.status(200).json(arrayOfAllProducts);
  } catch (error) {
    next(error);
  }
};

// The R of BREAD - Read operation
const read = async (request, response, next) => {
  try {
    // Fetch a specific product from the database based on the provided ID
    const arrayOfSpecificProduct = await tables.Product.read(request.params.id);

    // If the product is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the product in JSON format
    if (!arrayOfSpecificProduct) {
      response.sendStatus(404).send({ error: "Product not found" });
    } else {
      response.status(200).json(arrayOfSpecificProduct);
    }
  } catch (error) {
    console.error("Error reading product:", error);
    response
      .status(500)
      .send({ error: `Internal server error: ${error.message}` });
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation

const edit = async (request, response, next) => {
  // Extract the product data from the request body
  const { id } = request.params;
  const { image_file, name, description, price, stock_quantity } = request.body;

  try {
    const currentProduct = await tables.Product.read(id);

    if (!currentProduct) {
      return response.status(404).send({ error: "Product not found" });
    }

    // Update the product in the database
    const updatedProduct = await tables.Product.update(id, {
      image_file,
      name,
      description,
      price,
      stock_quantity,
    });

    if (!updatedProduct) {
      return response.status(400).send({ error: "Product not updated" });
    }

    return response
      .status(200)
      .send({ message: "Product updated successfully" });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    console.error("Error updating product:", error);
    response
      .status(500)
      .send({ error: `Internal server error: ${error.message}` });
    next(error);
  }

  return null;
};

// The A of BREAD - Add (Create) operation

const add = async (request, response, next) => {
  try {
    // Extract the product data from the request body
    const { image_file, name, description, price, stock_quantity } =
      request.body;

    if (!name || !description || !price || !stock_quantity) {
      return response.status(400).send({ error: "Missing required fields" });
    }

    // Insert the product into the database
    const createdProductId = await tables.Product.create({
      image_file,
      name,
      description,
      price,
      stock_quantity,
    });

    if (!createdProductId) {
      response.status(400).send({ error: "Product not created" });
    } else {
      // Respond with HTTP 201 (Created) and the ID of the newly inserted product
      response.status(201).send({ message: "Product created successfully" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    console.error("Error adding product:", error.message);
    response
      .status(500)
      .send({ error: `Internal server error: ${error.message}` });
    next(error);
  }

  return null;
};

// The D of BREAD - Destroy (Delete) operation

const destroy = async (request, response, next) => {
  try {
    // Delete the product from the database
    const affectedRows = await tables.Product.delete(request.params.id);

    if (!affectedRows) {
      response.status(404).send({ error: "Product not found" });
    } else {
      response.status(200).send({ message: "Product deleted successfully" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    console.error("Error deleting product:", error);
    response
      .status(500)
      .send({ error: `Internal server error: ${error.message}` });
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
