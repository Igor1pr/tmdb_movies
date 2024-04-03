import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Movie from './pages/Movie.jsx'
import Search from './pages/Search.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // O <React.StrictMode> envolve todo o conteúdo do aplicativo. Seu uso habilita um conjunto de verificações adicionais e avisos para ajudar a identificar e corrigir problemas na aplicação.
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='movie/:id' element={<Movie />} />
          <Route path='search' element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,

  // <BrowserRouter> é utilizado para prover o contexto do roteamento ao aplicativo. Isso permite que os componentes dentro dele tenham acesso às informações sobre a localização atual da URL e outras funcionalidades relacionadas ao roteamento.

  // <Routes> é um componente contêiner que define as rotas do aplicativo, sendo App o componente pai. Isso significa que todos os componentes dentro deste <Route> terão acesso ao contexto do roteamento (como histórico de navegação, localização atual, etc.).

  // <Route> é usado para definir uma rota específica dentro do <Routes>. Cada <Route> tem uma propriedade element que especifica o componente que deve ser renderizado quando a URL corresponde ao caminho definido na rota.

  // No caso da rota movie/:id, :id é um parâmetro dinâmico que pode ser acessado no componente Movie. Ele permite que você carregue filmes individualmente com base no ID fornecido na URL.

  // Para a rota search, não há necessidade de especificar o caminho completo no <Route>, porque a busca é baseada em query string, e o componente Search provavelmente acessará os parâmetros da query string diretamente do objeto de localização (por exemplo, props.location.search).
)
