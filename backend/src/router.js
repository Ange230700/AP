const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const productControllers = require("./controllers/productControllers");

// Route to get a list of items
router.get("/products", productControllers.browse);

// Route to get a specific item by ID
router.get("/products/:id", productControllers.read);

// Route to update an existing item by ID
router.put("/products/:id", productControllers.edit);

// Route to add a new item
router.post("/products", productControllers.add);

/* ************************************************************************* */

module.exports = router;
