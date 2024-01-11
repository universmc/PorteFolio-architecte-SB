// Object.js
document.addEventListener('DOMContentLoaded', () => {
    const modaleObjets = document.getElementById('modale-objets');
    const btnCloseModale = document.querySelector('.close-modale');
    const galleryContainer = document.querySelector('.gallery-container');

    // Fonction pour charger et afficher les objets
    function loadAndDisplayObjets() {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(works => {
                // Filtrer pour obtenir seulement les objets
                const objets = works.filter(work => work.category.name === 'Objets');
                // Ajouter les objets à la galerie
                objets.forEach(objet => {
                    const div = document.createElement('div');
                    div.innerHTML = `<img src="${objet.imageUrl}" alt="${objet.title}">`;
                    galleryContainer.appendChild(div);
                });
                // Afficher la modale
                modaleObjets.style.display = 'block';
            })
            .catch(error => console.error('Erreur:', error));
    }

    // Événement pour fermer la modale
    btnCloseModale.addEventListener('click', () => {
        modaleObjets.style.display = 'none';
    });

    // Initialisation
    loadAndDisplayObjets();
});
