const { string } = require("joi");
const mongoose = require("mongoose");
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    subscription: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TwitterPostSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    content: { type: String, required: true },
    media: { type: Array },
    datetime: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const InstaPostSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    content: { type: String, required: true },
    media: { type: Array },
    datetime: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const InstaPostModel = mongoose.model("instaposts", InstaPostSchema);
const TwitterPostModel = mongoose.model("twitterposts", TwitterPostSchema);
const UserModel = mongoose.model("Users", UserSchema);

module.exports = { UserModel, TwitterPostModel, InstaPostModel };
