import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="task-form">
        <div className="input-fields">
            <input id="title-input" placeholder="Title..."></input>
            <input id="about-input" placeholder="About..."></input>
        </div>
        <button onClick={() => mainButton()}>+</button>
      </div>
    </>
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