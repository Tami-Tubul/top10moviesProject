import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../../src/movies.css';
import FormDialog from './ModalForm';

const MovieDataComp = () => {
   

   const params = useParams()
   const movie = useSelector(state => state.movies.find(x => x.id == params.id)) 

   const navigate = useNavigate()

   const [open, setOpen] = useState(false);
  
   const handleOpen = () => {
      setOpen(true);

   }

   return (
      <>
        
         <img src={movie?.image}></img> <br />
         <strong>Genre:</strong><span>{movie?.genre}</span> <br/>
         <span><strong>Rating:</strong>{movie?.rating}</span><br/>

         <button onClick={handleOpen}>Edit</button>
         <button onClick={() => navigate(-1)}>Back</button>

         {open && <FormDialog modalHeading="Edit Movie" modalBtn="Update" isOpen={(stateModal) => setOpen(stateModal)} movieData={movie}/> }

      </>
   )

}

export default MovieDataComp;