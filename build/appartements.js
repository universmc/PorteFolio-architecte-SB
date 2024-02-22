// appartements.js
document.addEventListener('DOMContentLoaded', () => {
    const modaleAppartements = document.getElementById('modale-appartements');
    const btnCloseModale = document.querySelector('.close-modale');
    const galleryContainer = document.querySelector('.gallery-container');

    // Fonction pour charger et afficher les appartements
    function loadAndDisplayAppartements() {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(works => {
                // Filtrer pour obtenir seulement les appartements
                const appartements = works.filter(work => work.category.name === 'Appartements');
                // Ajouter les appartements à la galerie
                appartements.forEach(appartement => {
                    const div = document.createElement('div');
                    div.innerHTML = `<img src="${appartement.imageUrl}" alt="app">`;
                    galleryContainer.appendChild(div);
                });
                // Afficher la modale
                modaleAppartements.style.display = 'block';
            })
            .catch(error => console.error('Erreur:', error));
    }

    // Événement pour fermer la modale
    btnCloseModale.addEventListener('click', () => {
        modaleAppartements.style.display = 'none';
    });

    // Initialisation
    loadAndDisplayAppartements();
});
