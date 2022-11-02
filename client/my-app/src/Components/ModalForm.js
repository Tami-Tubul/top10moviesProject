import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import toast from 'toast-me';
import { useState } from 'react';

export default function FormDialog({ isOpen, modalHeading, modalBtn, movieData }) {
    const allMovies = useSelector(state => state.movies)
    let genres = allMovies.map(x => x.genre)
    genres = [...new Set(genres)] // remove duplicated

    const dispatch = useDispatch()

    const [newMovie, setNewMovie] = useState({ id: movieData?.id || uuidv4(), name: movieData?.name || "", genre: movieData?.genre || "", rating: movieData?.rating || 0, image: movieData?.image || "" })

    const handleClose = () => {
        isOpen(false)
    };

    const addOrEditMovie = async () => {
        
        //add movie
        if (modalBtn == "Add") {
            let status = await axios.post("http://localhost:1010/api/movies", newMovie)
            if (status.data == "Added!") {
                dispatch({ type: "ADD_MOVIE", payload: newMovie })
                toast("The movie was added!", { duration: 3000 })
                isOpen(false)
            }
            else {
                toast(status.data, { duration: 3000 })
            }
        }

        //edit movie
        if (modalBtn == "Update") {
            let status = await axios.put("http://localhost:1010/api/movies/" + newMovie.id, newMovie)
            if (status.data == "Updated!") {
                dispatch({ type: "UPDATE_MOVIE", payload: newMovie })
                toast("The movie was updated!", { duration: 3000 })
                isOpen(false)
            }
            else {
                toast(status.data, { duration: 3000 })
            }
        }


    }

    return (
        <div>

            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>{modalHeading}</DialogTitle>
                <DialogContent>

                    <TextField
                        onChange={e => setNewMovie({ ...newMovie, name: e.target.value })}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newMovie.name}
                    />
                    <FormControl fullWidth>
                        <Select onChange={e => setNewMovie({ ...newMovie, genre: e.target.value })}
                            value={newMovie.genre}
                        >

                            {
                                genres.map((x, index) => {
                                    return <MenuItem key={index} value={x}>{x}</MenuItem>
                                })
                            }

                        </Select>
                    </FormControl>
                    <TextField
                        onChange={e => setNewMovie({ ...newMovie, rating: parseInt(e.target.value) })}
                        autoFocus
                        margin="dense"
                        id="rating"
                        label="rating"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={newMovie.rating}
                    />
                    <TextField
                        onChange={e => setNewMovie({ ...newMovie, image: e.target.value })}
                        autoFocus
                        margin="dense"
                        id="image"
                        label="image"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={newMovie.image}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addOrEditMovie}>{modalBtn}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
