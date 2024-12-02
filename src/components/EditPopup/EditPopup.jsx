import { useState } from "react";
import "./EditPopup.css";

export default function EditPopup({
  currentTask,
  hide,
  tasks,
  setPressedTask,
}) {
  const [title, setTitle] = useState(currentTask.title);
  const [about, setAbout] = useState(currentTask.about);

  return (
    <>
      <div className="popup-background" onClick={hide}>
        <div
          className="edit-popup"
          onClick={(event) => event.stopPropagation()}
        >
          <input
            className="title-edit"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <textarea
            className="about-edit"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
          <div className="popup-edit-buttons">
            <button onClick={hide}>Cancel</button>
            <button
              onClick={(event) => {
                if (title != "" && about != "") {
                  event.stopPropagation();
                  tasks.set(currentTask.id, {
                    id: currentTask.id,
                    title: title,
                    about: about,
                  });
                  const storageTasks = [];
                  tasks.forEach((element) => {
                    storageTasks.push(element);
                  });
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
    </>
  );
}
