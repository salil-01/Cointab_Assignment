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
       CREATE TABLE IF NOT EXISTS users(
        name VARCHAR(50),
        age INT
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
