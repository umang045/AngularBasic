const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const prodRoute = require("./routes/prodRoute");
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", prodRoute);

app.listen(8000, () => {
  console.log("server running Succesfully!!");
});
