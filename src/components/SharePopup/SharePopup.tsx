import { useState } from "react";
import "./SharePopup.css";
import { Task } from "../../types";

interface SharePopupProps {
  currentTask: Task;
  hide: () => void;
}

export default function SharePopup({ currentTask, hide }: SharePopupProps) {
  const [buttonsClasses] = useState([
    "to-copy-button",
    "vk-button",
    "telegram-button",
    "watsapp-button",
    "facebook-button",
  ]);

  return (
    <div className="popup-background" onClick={hide}>
      <div className="share-popup">
        {buttonsClasses.map((buttonsClass, index) => (
          <button
            key={index}
            className={buttonsClass}
            onClick={(e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(
                `${currentTask.title}\n\n${currentTask.about}`
              );
            }}
          ></button>
        ))}
      </div>
    </div>
  );
}