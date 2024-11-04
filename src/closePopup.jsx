function closePopup() {
  const elements = document.getElementsByClassName("popup-background");
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  } 
}

export default closePopup