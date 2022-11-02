import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import MoviesComp from './Components/Movies';
import { Navigate, Route, Routes } from 'react-router-dom';
import MovieDataComp from './Components/MovieData';


function App() {

  const dispatch = useDispatch()
  
  useEffect(() => {

    async function fetchData() {
      
      let resp = await axios.get("http://localhost:1010/api/movies")
      dispatch({ type: "LOAD", payload: resp.data })

    }
    fetchData();

  }, [dispatch])

  return (
    <div className="App">
      <h1>Top 10 Movies</h1>
      
      <Routes>
        <Route path="/" element={<Navigate to="/movies" />}></Route>
        <Route path="/movies" element={<MoviesComp/>}></Route>
        <Route path="/movies/:id" element={<MovieDataComp/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
