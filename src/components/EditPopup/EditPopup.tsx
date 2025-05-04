import { useState } from "react";
import "./EditPopup.css";
import { Task, TasksMap } from "../../types";

interface EditPopupProps {
  currentTask: Task;
  hide: () => void;
  tasks: TasksMap;
  setPressedTask: () => void;
}

export default function EditPopup({
  currentTask,
  hide,
  tasks,
  setPressedTask,
}: EditPopupProps) {
  const [title, setTitle] = useState(currentTask.title);
  const [about, setAbout] = useState(currentTask.about);

  return (
    <div className="popup-background" onClick={hide}>
      <div className="edit-popup" onClick={(e) => e.stopPropagation()}>
        <input
          className="title-edit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="about-edit"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <div className="popup-edit-buttons">
          <button onClick={hide}>Cancel</button>
          <button
            onClick={(e) => {
              if (title && about) {
                e.stopPropagation();
                tasks.set(currentTask.id, {
                  id: currentTask.id,
                  title,
                  about,
                });
                const storageTasks: Task[] = [];
                tasks.forEach((element) => storageTasks.push(element));
                localStorage.setItem("tasks", JSON.stringify(storageTasks));
                hide();
                setPressedTask();
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}