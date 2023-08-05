const mysql = require("mysql2/promise");

const databaseConfig = {
  host: "localhost",
  user: "root",
  password: "salil",
  database: "cointab",
};
let connection;

const connectToDB = async () => {
  try {
    if (!connection) {
      connection = await mysql.createConnection(databaseConfig);
      console.log("Connected to DB");
    }
  } catch (error) {
    console.log("Error Connecting to DB", error);
    throw error;
  }
};

module.exports = connectToDB;
