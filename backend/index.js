const { adminRouter } = require("./routes/adminRoute");
const { configureCloudinary } = require("./utils/cloudinaryTools");
const { configureDatabase } = require("./utils/configureDatabase");

const app = require("express")();
require("dotenv").config({ path: "./.env" });
app.use(require("cors")());
app.use(require("body-parser").json());
app.use(require("express").json());
app.use(
  require("express-fileupload")({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

configureDatabase();
configureCloudinary();

app.get("/", (req, res) => {
  res.send("admin pannel backend");
});
app.use("/admin", adminRouter);
app.listen(process.env.PORT || 4500, () => {
  console.log("Server running successfully!");
});
