const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDB();
const app = express();
const port = process.env.port || 5000;

//this middleware we use to see the data that client sends through Body of req
app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started ${port}`);
});
