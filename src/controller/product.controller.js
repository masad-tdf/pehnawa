import Product from "../models/product.model.js"; // Importing Product model
import createError from "../utils/createError.js"; // Importing utility function for creating errors

// Controller function to create a new product
export const createProduct = async (req, res, next) => {
  try {
    const { Name, size, qty, price, status } = req.body; // Destructuring request body
    const existingProduct = await Product.find({ Name, size }); // Checking if the product already exists

    // If product already exists, return a 403 Forbidden error
    if (existingProduct[0])
      return next(
        createError(
          403,
          "Product already exists. Kindly update the product if you want to change something."
        )
      );

    // Creating a new product object
    let newProduct = new Product({
      ...req.body,
    });

    // If quantity is not provided or is 0, set status to "Out of Stock"
    if (!qty || qty == 0) {
      newProduct.status = "Out of Stock";
    }

    // Saving the new product
    await newProduct.save();
    res.send(newProduct); // Sending response with the new product
  } catch (err) {
    next(err); // Handling errors
  }
};

// Controller function to delete a product
export const deleteProduct = async (req, res, next) => {
  try {
    const existingProduct = await Product.findById(req.params.id); // Finding the product by ID

    // If product doesn't exist, return a 404 Not Found error
    if (!existingProduct) return next(createError(404, "Product not found"));

    // Deleting the product
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted."); // Sending response
  } catch (err) {
    next(err); // Handling errors
  }
};

// Controller function to get all products
export const getAllProduct = async (req, res, next) => {
  try {
    const existingProducts = await Product.find(); // Finding all products

    // If no products found, return a 204 No Content error
    if (!existingProducts) return next(createError(204, "Product not found"));

    // Sending response with all products
    res.status(200).send(existingProducts);
  } catch (err) {
    next(err); // Handling errors
  }
};

// Controller function to get a specific product by ID
export const getProduct = async (req, res, next) => {
  try {
    const existingProduct = await Product.findById(req.params.id); // Finding the product by ID

    // If product doesn't exist, return a 204 No Content error
    if (!existingProduct) return next(createError(204, "Product not found"));

    // Sending response with the found product
    res.status(200).send(existingProduct);
  } catch (err) {
    next(err); // Handling errors
  }
};

// Controller function to update a product
export const updateProduct = async (req, res, next) => {
  try {
    const existingProduct = await Product.findById(req.params.id); // Finding the product by ID

    // If product doesn't exist, return a 404 Not Found error
    if (!existingProduct) return next(createError(404, "Product not found"));

    const { Name, size, qty, price, discount } = req.body; // Destructuring request body

    // Define fields to be updated
    let updateFields = { Name, size, qty, price, discount, status: "In Stock" };

    // If quantity is less than 0, set status to "Out of Stock"
    if (qty < 0) {
      updateFields.status = "Out of Stock";
    }

    // Update the product
    const updatedProduct = await Product.updateOne(
      { _id: req.params.id },
      { $set: updateFields }
    );

    // Sending response with the updated product
    res.status(200).send(updatedProduct);
  } catch (err) {
    next(err); // Handling errors
  }
};
