const express = require("express");
const cors = require("cors");
const { userRouter } = require("./routes/User.route");
const { createTable } = require("./config/db");
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

// user route
app.use("/user", userRouter);

// server configs
app.listen(8080, async () => {
  try {
    createTable();
    console.log(`Server running at port ${8080}`);
  } catch (error) {
    console.log(error);
  }
});
