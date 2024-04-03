import { useEffect, useState } from "react";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import MovieCard from "../components/MovieCard";
import "./Movie.css";

// nesse caso o parâmetro está intrínseco na URL (main.jsx) fazendo com que seja mais simples resgatar os detalhes do filme com useParams
import { useParams } from "react-router-dom";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
  // Pegar o id que está na URL
  const { id } = useParams();

  // Estado para Movie começando como null
  const [movie, setMovie] = useState(null);

  // Função que vai carregar o filme, espera uma URL
  const getMovie = async (url) => {

    const res = await fetch(url);
    const data = await res.json();
  
    setMovie(data);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    })
  }

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieUrl);
  }, []);
  
  return (
    <div className="movie-page">
      {movie && (
      <>
        <MovieCard movie={movie} showLink={false} /> 
        <p className="tagline">{movie.tagline}</p>
        <div className="info">
          <h3>
            <BsWallet2 /> Orçamento:
          </h3>
          <p>{formatCurrency(movie.budget)}</p>
        </div>
        <div className="info">
          <h3>
            <BsGraphUp /> Receita:
          </h3>
          <p>{formatCurrency(movie.revenue)}</p>
        </div>
        <div className="info">
          <h3>
            <BsHourglassSplit /> Duração:
          </h3>
          <p>{movie.runtime} minutos</p>
        </div>
        <div className="info-description">
          <h3>
            <BsFillFileEarmarkTextFill /> Descrição
          </h3>
          <p>{movie.overview}</p>
        </div>
      </>
      )}
    </div>
  )
}

export default Movie