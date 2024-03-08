import mongoose from "mongoose"; // Importing mongoose library

const { Schema } = mongoose; // Destructuring Schema from mongoose

// Defining schema for user
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true, // Username is required
      unique: true, // Username must be unique
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true, // Email must be unique
    },
    password: {
      type: String,
      required: true, // Password is required
    },
    userType: {
      type: String,
      enum: ["Admin", "Manager"], // User type can only be "Admin" or "Manager"
      default: "Manager", // Default user type is "Manager"
    },
    isAdmin: {
      type: Boolean,
      default: false, // By default, the user is not an admin
    },
  },
  {
    timestamps: true, // Adding createdAt and updatedAt fields
  }
);

// Creating User model based on userSchema
const User = mongoose.model("User", userSchema);

export default User; // Exporting User model
