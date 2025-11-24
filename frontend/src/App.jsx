import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Productos from './components/Productos.jsx'
import Eventos from './components/Eventos.jsx'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/Eventos" element={<Eventos/>}/>
      </Routes>
    </Router>
  )
}

export default App