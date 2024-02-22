// Get the modal, overlay, and button elements from the DOM
const modal = document.getElementById('modal_CRUD');
const overlay = document.getElementById('overlay');
const btnTrigger = document.getElementById('open-modal-btn');

// Function to open the modal and overlay
function openModal() {
  modal.style.display = 'block';
  overlay.style.display = 'block';
}

// Function to close the modal and overlay
function closeModal() {
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

// Event listeners
btnTrigger.addEventListener('click', openModal);
overlay.addEventListener('click', closeModal);

// Close button inside the modal, if you have one
const closeModalButton = document.querySelector('.close-modal-button');
if (closeModalButton) {
  closeModalButton.addEventListener('click', closeModal);
}



document.getElementById('open-modal-btn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
  });
  
  // Supposons que 'close-modal-btn' est l'identifiant du bouton pour fermer la modale
  document.getElementById('close-modal-btn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
  });
  

  document.getElementById('modal-content').addEventListener('click', function(event) {
    event.stopPropagation();
  });