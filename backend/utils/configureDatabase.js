const mongoose = require("mongoose");
require("dotenv").config({
  path: "../.env",
});
const configureDatabase = () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then((success) => {
        console.log(success.connection.host);
      })
      .catch((err) =>
        console.log({ message: "Something went wrong in connecting DB", err })
      );
  } catch (error) {
    console.log({ message: "Failed to connect DB", error });
  }
};

module.exports = { configureDatabase };
