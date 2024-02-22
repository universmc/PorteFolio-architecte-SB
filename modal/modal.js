// Récupérer les éléments du DOM
const openModalBtn = document.getElementById('openModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');

// Événement de clic sur le bouton pour ouvrir le modal
openModalBtn.addEventListener('click', () => {
    console.log("Test click");
    // Récupérer les données du fichier JSON/JS (vous devrez le remplacer par votre propre logique)
    const modalData = {
        title: 'Titre du Modal',
        content: 'Contenu du Modal',
        buttonText: 'Fermer'
    };

    // Générer le contenu du modal en fonction des données
    modalContent.innerHTML = `
        <h2>${modalData.title}</h2>
        <p>${modalData.content}</p>
        <button id="closeModalBtn">${modalData.buttonText}</button>
    `;

    // Afficher le modal en le rendant visible
    modalOverlay.style.display = 'block';

    // Événement de clic sur le bouton pour fermer le modal
    const closeModalBtn = document.getElementById('closeModalBtn');
    closeModalBtn.addEventListener('click', () => {
        // Cacher le modal en le rendant invisible
        modalOverlay.style.display = 'none';
    });
});
