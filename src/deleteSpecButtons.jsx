function deleteSpecButtons() {
  const elements = document.getElementsByClassName("spec-buttons");
  while(elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
  }   
}

export default deleteSpecButtons