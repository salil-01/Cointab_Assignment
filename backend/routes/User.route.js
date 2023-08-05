const mysql = require("mysql2/promise");
const express = require("express");
const { databaseConfig } = require("../config/db");
const userRouter = express.Router();

// to post data and store in db
userRouter.post("/", async (req, res) => {
  const data = req.body.data;
  try {
    const connection = await mysql.createConnection(databaseConfig);
    let batchSize = 3; // insert 3 rows in a single command
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);

      // placeholders to avoid injection
      const placeholders = batch.map(() => "(?, ?)").join(", ");

      // flatten the data
      const values = batch.flatMap((item) => [item.name, item.age]);

      // query for insertion
      const query = `INSERT INTO users(name, age) VALUES ${placeholders}`;

      await connection.query(query, values);
      connection.end(); //closing the connection
      res.status(200).send({ msg: "Data added to DB" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = { userRouter };
