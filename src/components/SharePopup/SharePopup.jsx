import './SharePopup.css'

export default function SharePopup({currentTask, hide}) {
  return (
    <>
      <div className='popup-background' onClick={hide}>
        <div className='share-popup'>
          <button className='to-copy-button' onClick={(event) => {event.stopPropagation(); navigator.clipboard.writeText(currentTask.title + "\n\n" + currentTask.about)}}></button>
          <button className='vk-button' onClick={(event) => {event.stopPropagation(); navigator.clipboard.writeText(currentTask.title + "\n\n" + currentTask.about)}}></button>
          <button className='telegram-button' onClick={(event) => {event.stopPropagation(); navigator.clipboard.writeText(currentTask.title + "\n\n" + currentTask.about)}}></button>
          <button className='watsapp-button' onClick={(event) => {event.stopPropagation(); navigator.clipboard.writeText(currentTask.title + "\n\n" + currentTask.about)}}></button>
          <button className='facebook-button' onClick={(event) => {event.stopPropagation(); navigator.clipboard.writeText(currentTask.title + "\n\n" + currentTask.about)}}></button>
        </div>
      </div>
    </>
  )
}