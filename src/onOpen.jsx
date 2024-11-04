import drawTasks from "./drawTasks";

function onOpen() {
  const taskCount = localStorage.length;
  for (let turn = 0; turn < taskCount; ++turn) {
      let title = localStorage.key(turn);
      let about = localStorage.getItem(title);
      drawTasks(title, about);
  }
}

export default onOpen