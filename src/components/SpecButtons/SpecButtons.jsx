import { useState } from 'react';
import './SpecButtons.css';
import SharePopup from '../SharePopup/SharePopup';
import EditPopup from '../EditPopup/EditPopup';

export default function SpecButtons({currentTask, tasks, setPressedTask}) {
  const [shareVisible, setShareVisible] = useState();
  const hideShare = () => {setShareVisible(false)};
  const [editVisible, setEditVisible] = useState();
  const hideEdit = () => {setEditVisible(false)};
  
  return (
    <>
      <div className='spec-buttons'>
        <button className='share-button' onClick={() => {setShareVisible(true)}}></button>
        <button className='info-button'></button>
        <button className='edit-button' onClick={() => {setEditVisible(true)}}></button>
      </div>
      {shareVisible ? <SharePopup currentTask={currentTask} hide={hideShare}></SharePopup> : <></>}
      {editVisible ? <EditPopup currentTask={currentTask} hide={hideEdit} tasks={tasks} setPressedTask={setPressedTask}></EditPopup> : <></>}
    </>
  )
}