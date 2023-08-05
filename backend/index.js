const express = require("express");
const cors = require("cors");
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.listen(8080, () => {
  try {
    console.log(`Server running ar port ${8080}`);
  } catch (error) {
    console.log(error);
  }
});
