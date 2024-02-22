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
        const modalGallery = document.querySelector('.modalGallery');
        works.forEach(work => {
            const projectContent = document.createElement('div');
            projectContent.className = `projet${work.id}-content`;
            projectContent.innerHTML = `
            <div class="delete-icon">
            <img src="assets/delete.png" alt="Delete">
            </div></div>
            <div class="img${work.id}-content"><img src="${work.imageUrl}" alt="${work.title}">

            `;
            modalGallery.appendChild(projectContent);
        });
    })
    .catch(error => console.error('Erreur:', error));

let arrayWorks = [];

// Fonction pour ajouter les travaux à la galerie avec l'icône de suppression
function addWorksToGallery(works) {
    modalGallery.innerHTML = ''; // Vide la galerie avant d'ajouter de nouveaux éléments
    works.forEach(work => {
        const workDiv = document.createElement('div');
        workDiv.className = 'projet-content';
        workDiv.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
            <h4>${work.title}</h4>
        `;
        modalGallery.appendChild(workDiv);
    });
}

// Récupération initiale des travaux
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        arrayWorks = data;
        addWorksToGallery(arrayWorks);
    })
    .catch(error => console.error('Erreur:', error));
