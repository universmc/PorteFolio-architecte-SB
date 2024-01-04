fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Traitez les données ici
    })
    .catch(error => console.error('Erreur:', error));

// affichage de donnée 
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(works => {
        const gallery = document.querySelector('.gallery');
        works.forEach(work => {
            const projectContent = document.createElement('div');
            projectContent.className = `projet${work.id}-content`;
            projectContent.innerHTML = `
                <div class="img${work.id}-content"><img src="${work.imageUrl}" alt="${work.title}"></div>
                <div class="titre-content"><h4>${work.title}</h4></div>
            `;
            gallery.appendChild(projectContent);
        });
    })
    .catch(error => console.error('Erreur:', error));

// filtrage 
// Récupération des éléments de la galerie et des boutons
const gallery = document.querySelector('.gallery');
const btnAll = document.getElementById('btn-filtre-all');
const btnObjects = document.getElementById('btn-filtre-objects');
const btnAppartements = document.getElementById('btn-filtre-appartements');
const btnHotelsRestaurants = document.getElementById('btn-filtre-hotel-restaurant');

let arrayWorks = [];

// Fonction pour ajouter les travaux à la galerie
function addWorksToGallery(works) {
    gallery.innerHTML = ''; // Vide la galerie avant d'ajouter de nouveaux éléments
    works.forEach(work => {
        const workDiv = document.createElement('div');
        workDiv.className = 'work-item';
        workDiv.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <h4>${work.title}</h4>
        `;
        gallery.appendChild(workDiv);
    });
}

// Fonction pour filtrer les travaux par catégorie
function filterWorksByCategory(categoryId) {
    const filteredWorks = arrayWorks.filter(work => work.category.id === categoryId);
    addWorksToGallery(filteredWorks);
}

// Écouteurs d'événements pour les boutons
btnAll.addEventListener('click', () => addWorksToGallery(arrayWorks));
btnObjects.addEventListener('click', () => filterWorksByCategory(1)); // Objets (ID 1)
btnAppartements.addEventListener('click', () => filterWorksByCategory(2)); // Appartements (ID 2)
btnHotelsRestaurants.addEventListener('click', () => filterWorksByCategory(3)); // Hôtels & restaurants (ID 3)

// Récupération initiale des travaux
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        arrayWorks = data;
        addWorksToGallery(arrayWorks);
    })
    .catch(error => console.error('Erreur:', error));
