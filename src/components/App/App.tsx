import { useState } from "react";
import "./App.css";
import TaskList from "../TaskList/TaskList";
import { useDispatch } from "react-redux";
import { reduceTaskId } from "../../slice";
import { TasksMap, Task } from "../../types";

export default function App() {
  const dispatch = useDispatch();
  const [taskId, setTaskId] = useState(() => {
    const storeLength = localStorage.getItem("tasks");
    const length = storeLength ? JSON.parse(storeLength).length : 0;
    dispatch(reduceTaskId(length));
    return length;
  });
  
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [tasks, setTasks] = useState<TasksMap>(() => {
    const storedTasks = localStorage.getItem("tasks");
    const helpMap = new Map<number, Task>();
    
    if (storedTasks) {
      try {
        JSON.parse(storedTasks).forEach((element: Task, id: number) => {
          helpMap.set(id, element);
        });
      } catch (e) {
        console.error("Failed to parse tasks", e);
      }
    }
    return helpMap;
  });

  function createTaskButton() {
    if (title.length !== 0 && about.length !== 0) {
      const task: Task = {
        id: taskId,
        title,
        about,
      };
      
      const newTasks = new Map(tasks);
      newTasks.set(task.id, task);
      
      setTasks(newTasks);
      localStorage.setItem("tasks", JSON.stringify([...newTasks.values()]));
      setTaskId(taskId + 1);
      dispatch(reduceTaskId(taskId + 1));
      setTitle("");
      setAbout("");
    }
  }

  return (
    <>
      <div className="task-form">
        <div className="input-fields">
          <input
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="About..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <button onClick={createTaskButton}>+</button>
      </div>
      <TaskList tasks={tasks} />
    </>
  );
}