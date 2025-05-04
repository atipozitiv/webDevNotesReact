import { useState } from "react";
import "./TaskList.css";
import DeletePopup from "../DeletePopup/DeletePopup";
import SpecButtons from "../SpecButtons/SpecButtons";
import { useDispatch, useSelector } from "react-redux";
import { reduceTaskId, reduceCurrentTask } from "../../slice";
import { RootState, TasksMap, Task, DeletePopupState } from "../../types";

interface TaskListProps {
  tasks: TasksMap;
}

export default function TaskList({ tasks }: TaskListProps) {
  const taskId = useSelector((state: RootState) => state.tasks.taskId);
  const dispatch = useDispatch();
  const [taskIndex, setTaskIndex] = useState<number | undefined>();
  const [pressedTask, setPressedTask] = useState<number | undefined>();
  const [deletePopup, setDeletePopup] = useState<DeletePopupState>({
    isVisible: false,
    isConfirm: false,
  });
  const [draggedTask, setDraggedTask] = useState<[number, Task] | undefined>();

  const deleteConfirm = () => {
    setDeletePopup({ isVisible: false, isConfirm: true });
    deleteTask();
  };

  const deleteCancel = () => setDeletePopup({ isVisible: false, isConfirm: false });

  function deleteTask() {
    if (taskIndex === undefined) return;

    tasks.delete(taskIndex);
    let turn = taskIndex;
    while (turn < taskId - 1) {
      const nextTask = tasks.get(turn + 1);
      if (nextTask) {
        tasks.set(turn, {
          id: turn,
          title: nextTask.title,
          about: nextTask.about,
        });
      }
      tasks.delete(turn + 1);
      turn += 1;
    }
    dispatch(reduceTaskId(taskId - 1));
    
    const storageTasks: Task[] = [];
    tasks.forEach((element) => {
      storageTasks.push(element);
    });
    localStorage.setItem("tasks", JSON.stringify(storageTasks));
  }

  function dragStartHandler(e: React.DragEvent, task: [number, Task]) {
    setDraggedTask(task);
    setPressedTask(undefined);
  }

  function dragEndHandler(e: React.DragEvent) {
    const target = e.target as HTMLElement;
    if (target.className === "task-block-text") {
      target.style.background = "#1F1E1B";
    }
  }

  function dragOverHandler(e: React.DragEvent) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.className === "task-block-text") {
      target.style.background = "#201f1c";
    }
  }

  function dropHandler(e: React.DragEvent, task: [number, Task]) {
    e.preventDefault();
    if (!draggedTask) return;

    const target = e.target as HTMLElement;
    if (target.className === "task-block-text") {
      target.style.background = "#1F1E1B";
    }

    const draggedTaskData = draggedTask[1];
    const currentTaskData = task[1];

    tasks.set(task[0], {
      id: task[0],
      title: draggedTaskData.title,
      about: draggedTaskData.about,
    });

    tasks.set(draggedTask[0], {
      id: draggedTask[0],
      title: currentTaskData.title,
      about: currentTaskData.about,
    });

    const storageTasks: Task[] = [];
    tasks.forEach((element) => {
      storageTasks.push(element);
    });
    localStorage.setItem("tasks", JSON.stringify(storageTasks));
    setDraggedTask(undefined);
  }

  if (taskId === 0) {
    return (
      <>
        <hr className="no-tasks" />
        <div className="no-tasks">No tasks</div>
        <hr className="no-tasks" />
      </>
    );
  }

  const tasksArr = Array.from(tasks);
  if (tasksArr.length > 1) {
    dispatch(reduceCurrentTask(tasksArr[1][0]));
  }

  return (
    <>
      {tasksArr.map((task, index) => (
        <div
          key={index}
          draggable={true}
          onDragStart={(e) => dragStartHandler(e, task)}
          onDragLeave={dragEndHandler}
          onDragEnd={dragEndHandler}
          onDragOver={dragOverHandler}
          onDrop={(e) => dropHandler(e, task)}
        >
          <div
            className="task-block"
            onClick={() => setPressedTask(pressedTask === index ? undefined : index)}
          >
            <div className="task-block-text">
              <p className="task-block-title">{task[1].title}</p>
              <p className="task-block-about">{task[1].about}</p>
            </div>
            <button
              className="task-block-button"
              onClick={(e) => {
                e.stopPropagation();
                setDeletePopup({ isVisible: true, isConfirm: false });
                setTaskIndex(index);
                setPressedTask(undefined);
              }}
            >×</button>
          </div>
          {pressedTask === index && (
            <SpecButtons
              currentTask={task[1]}
              tasks={tasks}
              setPressedTask={setPressedTask}
            />
          )}
        </div>
      ))}
      {deletePopup.isVisible && (
        <DeletePopup confirm={deleteConfirm} cancel={deleteCancel} />
      )}
    </>
  );
}