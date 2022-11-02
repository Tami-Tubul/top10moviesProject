const moviesFileDal = require("../DALs/moviesFileDAL");

const getMovies = async () => {
    let movies = await moviesFileDal.getMovies();
    return movies;
}

const getMovie = async (id) => {
    let movies = await moviesFileDal.getMovies();
    let movie = movies.find(x => x.id == id)
    return movie;
}

const addMovie = async (obj) => {
    let movies = await moviesFileDal.getMovies();
    let existMovie = movies.find(x => x.name == obj.name)
    if (existMovie)
        return "This movie already exist!"

    let lastRating = movies.reduce((x, y) => x.rating > y.rating ? y : x)
    let indexLastRating = movies.findIndex(x => x.rating == lastRating.rating)
    movies.splice(indexLastRating, 1)

    let newRating = obj.rating;
    let closestRatingObj = movies.reduce((x, y) => Math.abs(newRating - x.rating) < Math.abs(newRating - y.rating) ? x : y)
    let indexClosestRatingObj = movies.findIndex(x => x.rating == closestRatingObj.rating)
    if (newRating > closestRatingObj.rating)
        movies.splice(indexClosestRatingObj + 1, 0, obj)
    else
        movies.splice(indexClosestRatingObj, 0, obj)

    let status = await moviesFileDal.saveMovies({ "movies": movies })
    if (status == "Done!")
        return "Added!";
}

const updateMovie = async (id, obj) => {
    let movies = await moviesFileDal.getMovies();
    let index = movies.findIndex(x => x.id == id)
    if (index > -1) {
        movies[index] = obj
        let status = await moviesFileDal.saveMovies({ "movies": movies })
        if (status == "Done!")
            return "Updated!";
    }
}

const deleteMovie = async (id) => {
    let movies = await moviesFileDal.getMovies();
    let index = movies.findIndex(x => x.id == id)
    if (index > -1) {
        movies.splice(index, 1)
        let status = await moviesFileDal.saveMovies({ "movies": movies })
        if (status == "Done!")
            return "Deleted!";
    }
}

module.exports = { getMovies, getMovie, addMovie, updateMovie, deleteMovie }