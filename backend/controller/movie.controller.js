"use strict";
//require movie class and schema from "../model/movies.model"
const { Movie, moviesModel } = require("../model/movies.model");
//import axios
const axios = require("axios");
//import mongoose and mongo
const { mongoose, mongo } = require("mongoose");

//get all data from api
function getMovies(req, res) {
    axios
        .get(
            process.env.API_URL
        )
        .then((result) => {
            //do map loop on array(data)
            const resMov = result.data.results.map((data) => {
                return new Movie(data);
            });
            res.send(resMov);
        })
        .catch((err) => console.log("err", err));
}

// create favorite movies from api and stor in DB
function createFavMovies(req, res) {
    const { id, name, site, size, type } = req.body;

    moviesModel.find({ id: id }, (error, data) => {
        if (data.length > 0) {
            console.log("this also");
        } else {
            let newMovie = new moviesModel({
                id: id,
                name: name,
                site: site,
                size: size,
                type: type,
            });
            newMovie.save();
            console.log(newMovie)
            res.send(newMovie);
        }
    });
}

//get favorite movies from collection DB
function getFAV(req, res) {
    moviesModel.find({}, (error, data) => {
        if (error) {
            res.send(message.error);
        } else {
            res.send(data);
        }
    });
}

// delete favorite movies from DB
function deleteMovie(req, res) {
    const idx = req.params.idx;
    moviesModel.find({}, (error, data) => {
        if (error) {
            res.send(message.error);
        } else {
            for (let element in data) {
                console.log(data);
                if (idx === element) {
                    console.log(mongo.ObjectId(data[element]._id));
                    moviesModel.deleteOne(
                        { _id: mongo.ObjectId(data[element]._id) },
                        (error) => {
                            console.log(error);
                        }
                    );
                }
            }
            moviesModel.find({}, (error, data) => {
                res.send(data);
            });
        }
    });
}




///

function deleteMovie2(req, res) {
    const idx = req.params.idx;
    moviesModel.find({}, (error, data) => {
        if (error) {
            res.send(message.error)
        } else {
            data[idx].remove()
            moviesModel.find({}, (error, data) => {
                res.send(data)
            })
        }
    })
}


//

// do update favorite movies 
function updateFAV(req, res) {
    const idx = req.params.idx;
    const { id, name, site, size, type } = req.body;
    moviesModel.find({}, (error, data) => {
        if (error) {
            res.send(message.error)
        } else {
            // data[idx].id=id
            data[idx].name = name;
            data[idx].site = site;
            data[idx].size = size;
            data[idx].type = type;
            data[idx].save();
            res.data(data[idx])
        }
    })
}

// function delMovFilter(req, res) {
//     const index = req.params.index
//     const { site } = req.query
//     moviesModel.find({}, (error, data) => {
//         console.log(data);
//         const result = data.filter((item, idx) => {
//             console.log(index);
//             if (index != idx) {
//                 return item;
//             }
//         });
//         console.log(result)
//         data = result;
//         console.log(typeof data)
//         data.save();
//         res.send(data);
//     });
// }


async function deleteMO(req, res, next) {
    const id = req.params.id;
    try {
        const result = await moviesModel.findByIdAndDelete(id);
        // console.log(result);
        if (!result) {
            console.log(404, 'Product does not exist.');
        }
        res.send(result);
    } catch (error) {
        console.log(error.message);

        next(error);
    }
}

module.exports = {
    getMovies,
    createFavMovies,
    getFAV,
    deleteMovie,
    updateFAV,
    deleteMO,
    deleteMovie2,
    // delMovFilter,
};
