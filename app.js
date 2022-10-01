const express = require("express");
const app = express();
const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

async function main() {
  mongoose.connect("mongodb://localhost:27017/authDemo");
}
main()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("OH NO!");
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("this is homepage");
});

app.get("/secret", (req, res) => {
  res.send("This is Secret! You cannot see me unless you are logged in");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { password, username } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash,
  });
  await user.save();
  res.redirect("/login");
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    res.send("YAY WELCOME!");
  } else {
    res.send("TRY AGAIN");
  }
});

app.listen(3000, () => {
  console.log("Connected on port 3000");
});
