import { useState } from 'react';
import './TaskList.css';
import DeletePopup from '../DeletePopup/DeletePopup';
import SpecButtons from '../SpecButtons/SpecButtons';

export default function TaskList({taskId, tasks, setTaskId}) {
  const [taskIndex, setTaskIndex] = useState();
  const [pressedTask, setPressedTask] = useState();
  const [deletePopup, setDeletePopup] = useState({isVisible: false, isConfirm: false});
  const deleteConfirm = () => { 
    setDeletePopup({isVisible: false, isConfirm: true}); 
    deleteTask();
  }
  const deleteDeny = () => setDeletePopup({isVisible: false, isConfirm: false})
  const [draggedTask, setDraggedTask] = useState();

  if (taskId == 0) {
    return (
      <>
        <hr className="no-tasks"/>
        <div className="no-tasks">No tasks</div>
        <hr className="no-tasks"/>
      </>
    )
  } else {
    const tasksArr = Array.from(tasks);
    return (
      <>
        {tasksArr.map((task, index) => {
          return (
            <div key={index} draggable={true} onDragStart={(e) => dragStartHandler(e, task)} onDragLeave={(e) => dragEndHandler(e)} 
            onDragEnd={(e) => dragEndHandler(e)} onDragOver={(e) => dragOverHandler(e)} onDrop={(e) => dropHandler(e, task)}>
              <div className='task-block' key={index} onClick={() => pressedTask == index ? setPressedTask() : setPressedTask(index)}>
                <div className='task-block-text'>
                  <p className='task-block-title'>{task[1].title}</p>
                  <p className='task-block-about'>{task[1].about}</p>
                </div>
                <button className='task-block-button' onClick={(event) => {
                  event.stopPropagation();
                  setDeletePopup({isVisible: true, isConfirm: false});
                  setTaskIndex(index);
                  setPressedTask();
                }}>×</button>
              </div> 
              {pressedTask == index ? <SpecButtons currentTask={task[1]} tasks={tasks} setPressedTask={setPressedTask}></SpecButtons> : null}    
            </div>
          )
        })}
        {deletePopup.isVisible ? <DeletePopup confirm={deleteConfirm} deny={deleteDeny}></DeletePopup> : <></>}
      </>
    )
  };
  
  function deleteTask() {
    tasks.delete(taskIndex);
    let turn = taskIndex;
    while (turn < taskId - 1) {
      tasks.set(turn, {id: turn, title: tasks.get(turn + 1).title, about: tasks.get(turn + 1).about});
      tasks.delete(turn + 1);
      turn += 1;
    }
    setTaskId(taskId - 1);
    const storageTasks = [];
    tasks.forEach(element => {storageTasks.push(element)});
    localStorage.setItem('tasks', JSON.stringify(storageTasks))
  }

  function dragStartHandler(e, task) {
    setDraggedTask(task);
  }
  function dragEndHandler(e) {
    e.target.className == "task-block-text" ? e.target.style.background = "#1F1E1B" : null;
  }
  function dragOverHandler(e) {
    e.preventDefault();
    e.target.className == "task-block-text" ? e.target.style.background = "#201f1c" : null;
  }
  function dropHandler(e, task) {
    e.preventDefault();
    tasks.set(task[1].id, {id: task[1].id, title: draggedTask[1].title, about: draggedTask[1].about});
    tasks.set(draggedTask[1].id, {id: draggedTask[1].id, title: task[1].title, about: task[1].about});
    const storageTasks = [];
    tasks.forEach(element => {storageTasks.push(element)});
    localStorage.setItem('tasks', JSON.stringify(storageTasks));
    setDraggedTask();
  }
}