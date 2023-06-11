require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const People = require("./routes/people");

app.use(express.json());

//ROUTES
app.use("/people", People);

//MONGOOSE
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("Successfuly connected!");
});
//MONGOOSE
app.listen(3000, () => {
  console.log("Listening on the port 3000");
});
