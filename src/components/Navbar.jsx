import { Link, useNavigate } from "react-router-dom"
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi"
import { useState } from "react"
import './Navbar.css'

const Navbar = () => {

  // Controlar o state do search
  const [search, setSearch] = useState("")

  // O usuário vai ter que ser redirecionado a página de busca ao apertar enter ou clicar no botão
  // O navigate possui funções de redirecionamento no componente ao invocar a função useNavigate()
  const navigate = useNavigate()

  // Mapear evento de submit do input
  const handleSubmit = (e) => {
    // Previnir o evento default de submeter o form por requisição http
    e.preventDefault()

    // Não faz sentido o usuário entrar na página com uma busca vazia
    if (!search) return

    navigate(`/search?q=${search}`)
    setSearch("")
  }
  
  return (
    <nav id='navbar'>
        <h2>
          <Link to={'/'}><BiCameraMovie /> TMDB Movies</Link>
        </h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Pesquise por um filme" 
            /* Atrelando a mudança do input com a mudança do state */
            /* Cada vez que é digitado algo no input, o estado de search é alterado baseado nos eventos */
            onChange={(e) => setSearch(e.target.value)}
            /* Como queremos limpar o campo depois, bindamos ele com o state, permitindo mudar o valor do campo a partir do state */
            value={search} 
          />
          <button type="submit">
              <BiSearchAlt2 />
          </button>
        </form>
    </nav>
  )
}

export default Navbar