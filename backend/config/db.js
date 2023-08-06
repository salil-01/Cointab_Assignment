const mysql = require("mysql2/promise");

const databaseConfig = {
  host: "localhost",
  user: "root",
  password: "salil",
  database: "cointab",
};

// // create table if there is not any table in db
const createTable = async () => {
  try {
    const connection = await mysql.createConnection(databaseConfig);
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      gender VARCHAR(10),
      title VARCHAR(10),
      first_name VARCHAR(50),
      last_name VARCHAR(50),
      street_number INT,
      street_name VARCHAR(100),
      city VARCHAR(100),
      state VARCHAR(100),
      country VARCHAR(100),
      postcode VARCHAR(20),
      latitude DECIMAL(10, 7),
      longitude DECIMAL(10, 7),
      timezone_offset VARCHAR(10),
      timezone_description VARCHAR(100),
      uuid VARCHAR(100),
      email VARCHAR(100),
      username VARCHAR(50),
      password VARCHAR(100),
      salt VARCHAR(100),
      md5 VARCHAR(100),
      sha1 VARCHAR(100),
      sha256 VARCHAR(100),
      dob_date VARCHAR(100),
      dob_age INT,
      registered_date VARCHAR(100),
      registered_age INT,
      phone VARCHAR(20),
      cell VARCHAR(20),
      id_name VARCHAR(50),
      id_value VARCHAR(50),
      picture_large VARCHAR(255),
      picture_medium VARCHAR(255),
      picture_thumbnail VARCHAR(255),
      nationality VARCHAR(10)
      )
       `;
    await connection.query(query);
    connection.end();
    console.log("Table Created Successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createTable, databaseConfig };
