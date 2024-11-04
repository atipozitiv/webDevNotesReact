import './noTasks.css';

function noTasks() {
  const noTaskCount = document.getElementsByClassName("no-tasks");
  if (localStorage.length == 0) {
    if (noTaskCount.length == 0) {
        document.body.insertAdjacentHTML('afterend', '<hr class="no-tasks">');
        document.body.insertAdjacentHTML('afterend', '<div class="no-tasks">No tasks</div>');
        document.body.insertAdjacentHTML('afterend', '<hr class="no-tasks">');
    }
  } else {
    const elements = document.getElementsByClassName("no-tasks");
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }   
  }    
}

export default noTasks