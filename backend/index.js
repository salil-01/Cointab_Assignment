const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/db");
const { userRouter } = require("./routes/User.route");
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
    await connectToDB();
    console.log(`Server running at port ${8080}`);
  } catch (error) {
    console.log(error);
  }
});
