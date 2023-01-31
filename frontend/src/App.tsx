import { useState } from 'react'
import reactLogo from './assets/react.svg'
import {TodoApp} from './Components/TodoApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App wrapper">
      <TodoApp />
    </div>
  )
}

export default App
