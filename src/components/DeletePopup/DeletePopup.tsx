import "./DeletePopup.css";

interface DeletePopupProps {
  confirm: () => void;
  cancel: () => void;
}

export default function DeletePopup({ confirm, cancel }: DeletePopupProps) {
  return (
    <div className="popup-background" onClick={cancel}>
      <div className="delete-popup">
        <p>Delete this task?</p>
        <div>
          <button
            className="delete-popup-button-yes"
            onClick={(e) => {
              e.stopPropagation();
              confirm();
            }}
          >
            Yes
          </button>
          <button className="delete-popup-button-no" onClick={cancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}