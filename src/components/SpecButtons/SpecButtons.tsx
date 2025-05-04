import { useState } from "react";
import "./SpecButtons.css";
import SharePopup from "../SharePopup/SharePopup";
import EditPopup from "../EditPopup/EditPopup";
import { Task, TasksMap } from "../../types";

interface SpecButtonsProps {
  currentTask: Task;
  tasks: TasksMap;
  setPressedTask: (value?: number) => void;
}

export default function SpecButtons({
  currentTask,
  tasks,
  setPressedTask,
}: SpecButtonsProps) {
  const [shareVisible, setShareVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const hideShare = () => setShareVisible(false);
  const hideEdit = () => setEditVisible(false);

  return (
    <>
      <div className="spec-buttons">
        <button
          className="share-button"
          onClick={() => setShareVisible(true)}
        ></button>
        <button className="info-button"></button>
        <button
          className="edit-button"
          onClick={() => setEditVisible(true)}
        ></button>
      </div>
      {shareVisible && (
        <SharePopup currentTask={currentTask} hide={hideShare} />
      )}
      {editVisible && (
        <EditPopup
          currentTask={currentTask}
          hide={hideEdit}
          tasks={tasks}
          setPressedTask={setPressedTask}
        />
      )}
    </>
  );
}