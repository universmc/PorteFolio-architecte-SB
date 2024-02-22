// Attendre le chargement complet du DOM
document.addEventListener('DOMContentLoaded', function() {
    // Écouteur d'événement pour ouvrir la modal
    document.getElementById('open-modal').addEventListener('click', function() {
        displayModal(1); // Ouvre la modal pour l'étape 1
    });
});

function displayModal(step) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');

    // Créer le contenu de la modal en fonction de l'étape
    let modalElements = createModalContent(step);
    modalContent.innerHTML = '';
    modalContent.appendChild(modalElements.header);
    modalContent.appendChild(modalElements.main);
    modalContent.appendChild(modalElements.footer);

    // Afficher la modal
    modalOverlay.style.display = 'block';

    // Gestion de la fermeture de la modal
    attachCloseEvent(modalOverlay);
}

function createModalContent(step) {
    // Utiliser les fonctions existantes pour créer le contenu de la modal
    switch(step) {
        case 1: return createStep1Modal();
        case 2: return createStep2Modal();
        case 3: return createStep3Modal();
        default: console.error('Étape non reconnue'); return {};
    }
}

function attachCloseEvent(modalOverlay) {
    // Fermeture de la modal quand on clique sur 'close-modale'
    modalOverlay.querySelectorAll('.close-modale').forEach(button => {
        button.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
        });
    });

    // Fermeture de la modal quand on clique en dehors du contenu
    window.addEventListener('click', function(event) {
        if (event.target == modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });
}

// ... Vos fonctions createStep1Modal, createStep2Modal, createStep3Modal ...
