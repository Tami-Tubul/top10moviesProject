import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormDialog from "./ModalForm";
import MovieComp from "./Movie";


const MoviesComp = () => {


  const allMovies = useSelector(state => state.movies)
  let genres = allMovies.map(x => x.genre)
  genres = [...new Set(genres)] // remove duplicated

  const [filterMovies, setFilterMovies] = useState([])
  
 
  const selectGenre = (e) => {
    setFilterMovies(allMovies.filter(item => item.genre == e.target.value))
  }
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  

  return (
    <>
      <h2>Movies List:</h2>
      
      <button onClick={handleOpen}>Add Movie</button> <br />

      {open && <FormDialog modalHeading="Add Movie" modalBtn="Add" isOpen={(stateModal) => setOpen(stateModal)} /> }

      <select onChange={e => selectGenre(e)}>
        <option>Sort Movies By Genre:</option>
        {

          genres.map((x,index) => {
            return <option key={index}>{x}</option>
          })
        }

      </select> <br />

      <ul className="movies-list">

        {
         filterMovies.length == 0 ?
            allMovies.map(item => {
              return <li key={item.id}><Link to={"/movies/" + item.id}><MovieComp movieData={item} /></Link></li>
            }) :
            filterMovies.map(item => {
              return <li key={item.id}><Link to={"/movies/" + item.id}><MovieComp movieData={item} /></Link></li>
            })
            
         
        } 

      </ul>
    </>
  )

}

export default MoviesComp;