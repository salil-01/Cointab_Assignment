const mysql = require("mysql2/promise");
const express = require("express");
const { databaseConfig } = require("../config/db");
const userRouter = express.Router();

// to get the data from db

userRouter.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = req.query.country || null;

  const offset = (page - 1) * limit; //calculating offset
  try {
    const connection = await mysql.createConnection(databaseConfig);

    //query
    let query = "SELECT SQL_CALC_FOUND_ROWS * FROM users";
    if (filter) {
      query += " WHERE country = ?"; //for filtering
    }
    query += " LIMIT ? OFFSET ?"; //paginate

    if (filter) {
      [results] = await connection.query(query, [filter, limit, offset]);
      const [countResult] = await connection.query(
        "SELECT FOUND_ROWS() as totalCount"
      );
      totalCount = countResult[0].totalCount;
    } else {
      [results] = await connection.query(query, [limit, offset]);
      const [countResult] = await connection.query(
        "SELECT FOUND_ROWS() as totalCount"
      );
      totalCount = countResult[0].totalCount;
    }

    // Closing connection
    await connection.end();

    res.status(200).send({ ok: true, data: results, total: totalCount });
  } catch (error) {
    res.status(400).send({ ok: false, error: error.message });
  }
});

// to post data and store in db
userRouter.post("/", async (req, res) => {
  const data = req.body.results;
  try {
    const connection = await mysql.createConnection(databaseConfig);
    let batchSize = 50; // insert 50 rows in a single command can  update it to add or less rows in a single batch
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);

      // placeholders to avoid injection
      const placeholders = batch
        .map(
          () =>
            "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        )
        .join(", ");

      // flatten the data
      const values = batch.flatMap((item) => {
        const gender = item.gender;
        const { title, first, last } = item.name;
        const { number, name } = item.location.street;
        const { city, state, country, postcode } = item.location;
        const { latitude, longitude } = item.location.coordinates;
        const { offset, description } = item.location.timezone;
        const email = item.email;
        const { uuid, username, password, salt, md5, sha1, sha256 } =
          item.login;
        const { date, age } = item.dob;
        const { date: regDate, age: regAge } = item.registered;
        const phone = item.phone;
        const cell = item.cell;
        const { name: idName, value: idValue } = item.id;
        const { large, medium, thumbnail } = item.picture;
        const { nat } = item.nat;

        return [
          gender,
          title,
          first,
          last,
          number,
          name,
          city,
          state,
          country,
          postcode,
          latitude,
          longitude,
          offset,
          description,
          uuid,
          email,
          username,
          password,
          salt,
          md5,
          sha1,
          sha256,
          date,
          age,
          regDate,
          regAge,
          phone,
          cell,
          idName,
          idValue,
          large,
          medium,
          thumbnail,
          nat,
        ];
      });

      // query for insertion

      const query = `INSERT INTO users (
        gender, title, first_name, last_name, 
        street_number, street_name, 
        city, state, country, postcode, 
        latitude, longitude, 
        timezone_offset, timezone_description, uuid, 
        email, username, password, 
        salt, md5, sha1, sha256,
        dob_date, dob_age, 
        registered_date, registered_age, 
        phone, cell, 
        id_name, id_value, 
        picture_large, picture_medium, picture_thumbnail, 
        nationality
      ) VALUES ${placeholders}`;

      // console.log("Number of placeholders:", placeholders.split(",").length);
      // console.log("Number of values:", values.length);

      await connection.query(query, values);
      await connection.end(); //closing the connection
      res.status(200).send({ ok: true, msg: "Data added to DB" });
    }
  } catch (error) {
    res.status(400).send({ ok: false, error: error.message });
  }
});

userRouter.delete("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection(databaseConfig);
    const query = `DELETE FROM users`;
    await connection.query(query);
    await connection.end();
    res.status(200).send({ ok: true, msg: "All rows deleted succesfully" });
  } catch (error) {
    res
      .status(400)
      .send({ ok: false, msg: "Error while deleting", error: error });
  }
});

module.exports = { userRouter };
