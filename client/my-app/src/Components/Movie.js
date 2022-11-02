import '../../src/movies.css';

const MovieComp = ({movieData}) => {

   return(
    <>
     
     <div className="text-block">{movieData.name}</div>
     <img src={movieData.image} alt={movieData.name}></img> <br/>
    
    </>
   )

}

export default MovieComp;