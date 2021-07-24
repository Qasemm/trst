"use strict";
const mongoose = require("mongoose");

class Movie {
  constructor(result) {
    this.id = result.id;
    this.name = result.name;
    this.site = result.site;
    this.size = result.size;
    this.type = result.type;
  }
}

const moviesSchema = new mongoose.Schema({
  id: { type: String, required: true, index: { unique: true } },
  name: { type: String },
  site: { type: String },
  size: { type: Number },
  type: { type: String },
});

const moviesModel = mongoose.model("movie", moviesSchema);

const insertdata = (req, res) => {
  const oneRecord = new moviesModel({
    id: "5794fffbc3a36829ab00056f",
    name: "Interstellar Movie - Official Trailer",
    site: "YouTube",
    size: 1080,
    type: "Trailer",
  });
  oneRecord.save();
  console.log(oneRecord);
};

module.exports = { Movie, moviesModel, insertdata };
