import { useEffect, useState } from 'react'
import noTasks from "./noTasks.jsx"
import onOpen from './onOpen.jsx'
import drawTasks from './drawTasks.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  onOpen();
  noTasks();
  let activeTask;

  return (
    <>
      <div className="task-form">
        <div className="input-fields">
            <input id="title-input" placeholder="Title..."></input>
            <input id="about-input" placeholder="About..."></input>
        </div>
        <button onClick={() => mainButton()}>+</button>
      </div>
      {/* <div>
        <a href="https://vite.dev" target="_blank">

        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )

  const [todo, setTodo] = useEffect([]);
  return (
    <button onClick={() => {setTodo([...todo, "1"])}}>+</button>
  ){todo.map((todo, index) => {
      return (
        <>
          <h1 key={index}>{todo}</h1>
        </>
      )
    })}
  )
}

function mainButton() {
  const titleInput = document.getElementById("title-input");
  let titleInputValue = titleInput.value;
  const aboutInput = document.getElementById("about-input");
  let aboutInputValue = aboutInput.value;

  if(!((titleInputValue.length == 0) && (aboutInputValue.length == 0))) {
      localStorage.setItem(titleInputValue, aboutInputValue);
      titleInput.value = "";
      aboutInput.value = "";
      drawTasks(titleInputValue, aboutInputValue);
  }
  noTasks();
}

export default App
