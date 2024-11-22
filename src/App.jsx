import { useEffect, useState } from 'react'
import './App.css'


export default function App() {
  const [taskId, setTaskId] = useState(() => {
    const storeLength = localStorage.getItem('tasks');
    return storeLength ? JSON.parse(storeLength).length : 0;
  });
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    let helpMap = new Map();
    let id = 0; 
    try {
      JSON.parse(storedTasks).forEach(element => {
        helpMap.set(id, element);
        id += 1;
      })
    } catch {}
    return storedTasks ?  helpMap : new Map();
  });

  console.log(tasks);

  return (
    <>
      <div className="task-form">
        <div className="input-fields">
          <input className="title-input" placeholder="Title..." onChange={e => setTitle(e.target.value)}></input>
          <input className="about-input" placeholder="About..." onChange={e => setAbout(e.target.value)}></input>
        </div>
        <button onClick={mainButton}>+</button>
      </div>
    </>
  )

  function mainButton() {
    if ((title.length != 0) && (about.length != 0)) {
      const task = {
        id: taskId,
        title: title,
        about: about,
      };
      setTasks(tasks.set(task.id, task));
      const storageTasks = []
      tasks.forEach(element => {
        storageTasks.push(element)
      });
      localStorage.setItem('tasks', JSON.stringify(storageTasks));
      setTaskId(taskId + 1);
    }
  }
}