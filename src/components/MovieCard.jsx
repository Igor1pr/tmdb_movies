// Componentização do card dos filmes que será utilizado em várias partes da aplicação

import { Link } from "react-router-dom"

import { FaStar } from 'react-icons/fa'

const imageURL = import.meta.env.VITE_IMG

// O showLink serve para mostrar o botão que leva para a view individual de cada filme. Ela está declarada para mostrar o botão na home, mas não na view individual de cada filme, já que não faria sentido
const MovieCard = ({movie, showLink = true}) => {

  const average = Math.round(movie.vote_average * 10) / 10
  const fixed_average = average.toFixed(1);

  return (
    <div className="movie-card">
        <img src={`${imageURL}${movie.poster_path}`} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>
            <FaStar /> {fixed_average}
        </p>
        {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  )
}

export default MovieCard