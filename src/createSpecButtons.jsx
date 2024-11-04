function createSpecButtons() {
  let specButtons = document.createElement('div');
  specButtons.classList.add('spec-buttons');
  let shareButton = document.createElement('button');
  shareButton.classList.add('share-button');
  let infoButton = document.createElement('button');
  infoButton.classList.add('info-button');
  let editButton = document.createElement('button');
  editButton.classList.add('edit-button');
  specButtons.appendChild(shareButton);
  specButtons.appendChild(infoButton);
  specButtons.appendChild(editButton);
  return specButtons;
}

export default createSpecButtons