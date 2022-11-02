const jFile = require("jsonfile");

const getMovies = () => {
    return new Promise((resolve, reject) => {
        jFile.readFile(__dirname + "/../Data/movies.json", function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data.movies)
            }
        })
    })
}

const saveMovies = (obj) => {
    return new Promise((resolve, reject) => {
        jFile.writeFile(__dirname + "/../Data/movies.json", obj, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve("Done!")
            }
        })
    })
}

module.exports = { getMovies, saveMovies }