const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// % const { uploadProfilePicture } = require("./services/multer");
const { hashPassword, verifyToken } = require("./services/auth");

// Import itemControllers module for handling item-related operations
const productControllers = require("./controllers/productControllers");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");

// Route to get a list of items

// § productControllers
router.get("/products", productControllers.browse);

// * userControllers
router.get("/users", userControllers.browse);

// Route to get a specific item by ID

// § productControllers
router.get("/product/:id", productControllers.read);

// * userControllers
router.get("/user", verifyToken, userControllers.readWithToken);

// Route to update an existing item by ID

// § productControllers
router.put("/product/:id", productControllers.edit);

// * userControllers
router.put("/user", hashPassword, userControllers.editWithToken);

// Route to add a new item

// § productControllers
router.post("/product", productControllers.add);

// $ authControllers
router.post("/login", authControllers.login);

// * userControllers
router.post("/user", hashPassword, userControllers.add);

// Route to delete an item by ID

// § productControllers
router.delete("/product/:id", productControllers.destroy);

// * userControllers
router.delete("/user", verifyToken, userControllers.destroyWithToken);

/* ************************************************************************* */

module.exports = router;
