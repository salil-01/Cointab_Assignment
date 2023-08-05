const express = require("express");
const { dataSchema } = require("../models/User.model");

const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
  const data = req.body;
  try {
    // res.status(200).send(req.body);
    const { error, value } = dataSchema.validate(data);
    if (error) {
      throw error;
    }
    console.log("data validated");
    res.send("ok");
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = { userRouter };
