import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="bg-red-500">
      <h1 className="text-white text-4xl font-bold">Hello World</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Click me</button>
    </div>
    </>
  )
}

export default App
