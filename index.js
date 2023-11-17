const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const customermodel = require("./Schema");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://ponly4879:1234@cluster0.taskirs.mongodb.net/db"
);

app.post("/register", (req, res) => {
  customermodel
    .create(req.body)
    .then((customers) => res.json(customers))
    .catch((err) => res.json(err));
});

app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await customermodel.findOne({ name: name });

    if (user) {
      if (user.password === password) {
        console.log("Logged in");
        return res.json(user);
      } else {
        console.log("Incorrect password");
        return res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      console.log("User Invalid");
      return res.status(401).json({ error: "user dont exist" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(3001, () => {
  console.log("server is running");
});