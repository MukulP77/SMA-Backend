const express = require("express");

const app = express();
require("dotenv").config();

const connectDB = require("./Database/connection");
const {
  UserModel,
  TwitterPostModel,
  InstaPostModel,
} = require("./Database/models");
const tweet = require("./twitter");
const insta = require("./insta");
const { ValidateSignup, ValidateSignin } = require("./validate/index");

app.use(express.json());

app.listen(4000, () =>
  connectDB()
    .then(() => console.log("Server is up and running"))
    .catch((error) => {
      console.log(error);
      console.log("Server is running, but database connection failed ...");
    })
);

app.post("/register", async (req, res, next) => {
  const { fullName, email, phoneNumber, password, subscription } = req.body;
  try {
    await ValidateSignup({
      fullName,
      email,
      phoneNumber,
      password,
      subscription,
    });
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      throw new Error("Email already exists");
    }

    const newUser = await UserModel.create({
      fullName,
      email,
      password,
      phoneNumber,
      subscription,
    });
    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await ValidateSignin({ email, password });
    const user = await UserModel.findOne({ email });

    if (!user) throw new Error("User does not exist!!!");

    if (password !== user.password) {
      throw new Error("Password incorrect");
    }
    return res.status(200).json({ status: "success", user: user._id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// app.post("/user/data", async (req, res, next) => {
//   const id = req.body;
//   try {
//     const user = await UserModel.findById(id);
//     if (!user) throw new Error("User does not exist!!!");
//     return res.status(200).json({ user });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

app.post("/twitter/post", async (req, res, next) => {
  const { content, media, datetime, id } = req.body;
  try {
    const post = await TwitterPostModel.create({
      userID: id,
      content,
      datetime,
      status: "Pending",
      media,
    });
    if (!post) throw new Error("Post not scheduled");
    tweet(req.body);
    return res.status(200).json({ status: "Success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.post("/insta/post", async (req, res, next) => {
  console.log(req.body);
  const { content, media, datetime, id } = req.body;
  try {
    const post = await InstaPostModel.create({
      userID: id,
      content,
      datetime,
      status: "Pending",
      media,
    });
    if (!post) throw new Error("Post not scheduled");
    insta(req.body);
    return res.status(200).json({ status: "Success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
