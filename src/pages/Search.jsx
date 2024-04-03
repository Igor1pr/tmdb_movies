import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import "./MoviesGrid.css" 

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

const Search = () => {

  // a variável é envolvida em colchetes pois o useSearchParams() manda um array de funções, e para separá-las em funções desejadas, assim irá desestrutur a primeira que é a search params necessária
  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const query = searchParams.get("q")

  // Chamando os filmes via API
  // A função get é assíncrona pois faz uma requisição e vai esperar a URL da API como parâmetro
  const getSearchedMovies = async (url) => {

    // resposta baseada no await fetch, é feito um fetch para a URL
    const res = await fetch(url)

    // Dados recebidos sendo transformados em um array de objetos JS
    const data = await res.json()

    setMovies(data.results)
  }

  // A função getSearchedMovies precisa ser chamada sempre que a página ou componente for carregado
  // Com o hook useEffect, é possível executar uma função em alguns estágios da aplicação, baseado no array de dependências depois da função que é executada a cada vez que alguma dependência desse array é modificada
  // Ao colocar o query no array, a função será executada sempre que ele for alterado, e ele irá entender que precisa realizar a busca novamente
  useEffect(() => {

    // o que fica entre as crases é chamado de template string
    // montagem da URL pra acessar os filmes top rated, consistindo na URL dos filmes, top_rated e a chave de acesso, todos juntos
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`

    getSearchedMovies(searchWithQueryURL)

  }, [query])

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default Search