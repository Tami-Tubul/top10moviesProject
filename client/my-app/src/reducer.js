

function appReducer(state = { movies: [] }, action) {

    switch (action.type) {

        case "LOAD":
            return { ...state, movies: action.payload };

        case "ADD_MOVIE":

            let movies = [...state.movies];
            let newMovie = action.payload;
    
            let lastRating = movies.reduce((x, y) => x.rating > y.rating ? y : x)
            let indexLastRating = movies.findIndex(x => x.rating == lastRating.rating)
            movies.splice(indexLastRating, 1)

            let newRating = newMovie.rating;
            let closestRatingObj = movies.reduce((x, y) => Math.abs(newRating - x.rating) < Math.abs(newRating - y.rating) ? x : y)
            let indexClosestRatingObj = movies.findIndex(x => x.rating == closestRatingObj.rating)
            if (newRating > closestRatingObj.rating)
                movies.splice(indexClosestRatingObj + 1, 0, newMovie)
            else
                movies.splice(indexClosestRatingObj, 0, newMovie)

            return { ...state, movies: movies }

        case "UPDATE_MOVIE":
            
            let allMovies = [...state.movies];
            let updatedMovie = action.payload;
            let updatedMovieID = action.payload.id;

            let index = allMovies.findIndex(x => x.id == updatedMovieID)
            if (index > -1) {
                allMovies[index] = updatedMovie;    
            }

            return {...state , movies : allMovies}

        default:
            return state;
    }

}

export default appReducer;