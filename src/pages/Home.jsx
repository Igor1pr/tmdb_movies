// O useState é pra poder gerenciar o estado dos filmes e o useEffect é pra fazer a chamada da API quando a página carregar

import { useState, useEffect } from "react"
import MovieCard from "../components/MovieCard"

import './MoviesGrid.css'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

const Home = () => {

  // Gerenciar o estado dos melhores filmes
  const [topMovies, setTopMovies] = useState([])

  // Chamando os filmes via API
  // A função get é assíncrona pois faz uma requisição e vai esperar a URL da API como parâmetro
  const getTopRatedMovies = async (url) => {

    // resposta baseada no await fetch, é feito um fetch para a URL
    const res = await fetch(url)

    // Dados recebidos sendo transformados em um array de objetos JS
    const data = await res.json()

    setTopMovies(data.results)
  }

  // A função getTopRatedMovies precisa ser chamada sempre que a página ou componente for carregado
  // Com o hook useEffect, é possível executar uma função em alguns estágios da aplicação, baseado no array de dependências depois da função que é executada a cada vez que alguma dependência desse array é modificada
  // Ao deixar o array vazio, não é mepeada nenhuma dependência, então só é preciso executar a função quando a página é carregada
  useEffect(() => {

    // o que fica entre as crases é chamado de template string
    // montagem da URL pra acessar os filmes top rated, consistindo na URL dos filmes, top_rated e a chave de acesso, todos juntos
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`

    getTopRatedMovies(topRatedUrl)

  }, [])

  return (
    <div className="container">
      <h2 className="title">Filmes mais votados:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Home