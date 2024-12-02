import { useState } from "react";
import "./SharePopup.css";

export default function SharePopup({ currentTask, hide }) {
  const [buttonsClasses, setButtonsClasses] = useState([
    "to-copy-button",
    "vk-button",
    "telegram-button",
    "watsapp-button",
    "facebook-button",
  ]);

  return (
    <>
      <div className="popup-background" onClick={hide}>
        <div className="share-popup">
          {buttonsClasses.map((buttonsClass, index) => {
            return (
              <button
                key={index}
                className={buttonsClass}
                onClick={(event) => {
                  event.stopPropagation();
                  navigator.clipboard.writeText(
                    currentTask.title + "\n\n" + currentTask.about
                  );
                }}
              ></button>
            );
          })}
        </div>
      </div>
    </>
  );
}
