const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    age: {
      type: Number,
      min: [0, "Age must be positive"],
      max: [120, "Age seems invalid"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,   // ✅ you already made it optional
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    photoUrl: {
      type: String,
      validate: {
        validator: (value) => validator.isURL(value),
        message: (props) => `${props.value} is not a valid URL`,
      },
    },
    about: {
      type: String,
      maxlength: [200, "About section cannot exceed 200 characters"],
    },
    skills: {
      type: [String],
      validate: {
        validator: (skills) => skills.length > 0,
        message: "At least one skill is required",
      },
    },
  },
  {
    timestamps: true,   // ✅ correct place
  }
);

module.exports = mongoose.model("User", userSchema);
