require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
//connection DBS
mongoose
  .connect("mongodb://localhost:27017/movies", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
  //
const {
  getMovies,
  createFavMovies,
  getFAV,
  deleteMovie,
  updateFAV,
  deleteMO,
  deleteMovie2,
  // delMovFilter,
} = require("./controller/movie.controller");

const insertdata = require("./model/movies.model").insertdata;

app.get("/movie", getMovies);
app.post("/favorite", createFavMovies);
app.get("/favorite", getFAV);
app.put("/favorite/:idx", updateFAV);
app.get("/test", (req, res) => {
  insertdata();
});
app.delete("/:idx", deleteMovie);
app.delete("/d/:id", deleteMO);
app.delete("/dd/id", deleteMovie2);
// app.delete("/sa/:index", delMovFilter);

app.listen(port, () => console.log(`server is running on port ${port}`));
