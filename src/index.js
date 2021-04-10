require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// EXPRESSJS BODY PARSER
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS
app.use((request, response, next) => {
  response.setHeader("Content-Type", "application/json");
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  response.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  app.use(cors());
  next();
});


// ROUTES
app.use("/api", require("./routes/Lineup.routes"));


// SERVER
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🚀`));
