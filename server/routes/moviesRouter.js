const { response } = require("express");
const express = require("express")
const router = express.Router();

const moviesBL = require("../models/moviesBL")

router.get("/", async function(req,res) {
    let allMovies = await moviesBL.getMovies()
    return res.json(allMovies)
})

router.get("/:id", async function(req,res) {
    let id = req.params.id;
    let movie = await moviesBL.getMovie(id)
    return res.json(movie)
})

router.post("/", async function(req,res) {
    let obj = req.body;
    let status = await moviesBL.addMovie(obj)
    return res.json(status)
})

router.put("/:id", async function(req,res) {
    let id = req.params.id;
    let obj = req.body;
    let status = await moviesBL.updateMovie(id,obj)
    return res.json(status)
})

router.delete("/:id", async function(req,res) {
    let id = req.params.id;
    let status = await moviesBL.deleteMovie(id)
    return res.json(status)
})

module.exports = router;