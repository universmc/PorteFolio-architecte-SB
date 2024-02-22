const modalOverlay = document.getElementById('modalOverlay');
const openModalBtn = document.getElementById('open-modal-btn');
const modal = document.getElementById('modalContent');

// Ouvrir la modal
openModalBtn.addEventListener('click', () => {
  modalOverlay.style.display = 'block';
  modal.style.display = 'block';
});

// Fermer la modal en cliquant à l'extérieur
window.addEventListener('click', (event) => {
  if (event.target == modalOverlay) {
    modalOverlay.style.display = 'none';
    modal.style.display = 'none';
  }
});
