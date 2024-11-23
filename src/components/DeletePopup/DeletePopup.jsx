import './DeletePopup.css';

export default function DeletePopup({confirm, deny}) {
  return (
    <>
      <div className="popup-background" onClick={deny}>
        <div className="delete-popup">
          <p>Delete this task?</p>
          <div>
            <button className="delete-popup-button-yes" onClick={(event) => {event.stopPropagation(); confirm()}}>Yes</button>
            <button className="delete-popup-button-no" onClick={deny}>No</button>
          </div>
        </div>
      </div>
    </>
  )
}