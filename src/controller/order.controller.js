import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import createError from "../utils/createError.js";

export const placeOrder = async (req, res, next) => {
  try {
    // Extract data from the request body
    const { billingDetails, OrderSummary} = req.body;

    // Calculate total amount, discount, and payable amount for each product
    // for (const product of productsInfo) {
    //   const { price, discount } = await Product.findById(product.productId); // Get product price from database
    //   const totalAmount = price * product.qty;
    //   const payableAmount = totalAmount - (discount * totalAmount) / 100;

    //   product.totalAmount = totalAmount;
    //   product.discount = discount;
    //   product.payableAmount = payableAmount;
    //   product.productId = product.productId.toString(); // Convert productId to string
    //   delete product._id; // Remove the _id field
    // }

    // Create a new order instance using the Order model
    const newOrder = new Order({
      billingDetails,
      OrderSummary,
    });

    // Save the order to the database
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const existingOrder = await Order.findById(req.params.id);
    if (!existingOrder)
      return next(createError(204, "Order not found against this id"));
    if (req.body.status == "Delivered") {
      await existingOrder.updateById(
        { _id: req.params.id },
        { $set: { status: "Delivered" } }
      );
    } else {
      await existingOrder.updateById(
        { _id: req.params.id },
        { $set: { status: "Out for Delivery" } }
      );
    }
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    //{deliveryInfo.deliveryStatus : "Scheduled"}
    //const { status } = req.params;
    //const orders = await Order.find({ 'deliveryInfo.deliveryStatus': status });
    const orders = await Order.find();
    if (!orders) return next(createError(204, "Order not placed yet"));
      res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return next(createError(204, "Order not found against this id"));
    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)
      return next(createError(204, "Order not found against this id"));
    res.status(200).send("deleted.");
  } catch (err) {
    next(err);
  }
};
