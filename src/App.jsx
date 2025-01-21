import { useState } from 'react'
import './App.css'
import Tarjeta from './Componentes/Tarjeta'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Tarjeta></Tarjeta>
    </>
  )
}

export default App
