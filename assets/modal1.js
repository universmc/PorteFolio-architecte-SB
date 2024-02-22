// Fonction pour récupérer les travaux depuis le backend via Swagger
function fetchWorksFromBackend() {
    fetch('http://localhost:5678/api/works')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de réponse du serveur');
            }
            return response.json();
        })
        .then(works => {
            const gallery = document.querySelector('.modalGallery');
            gallery.innerHTML = ''; // Effacer le contenu existant

            works.forEach(work => {
                const imgElement = document.createElement('img');
                imgElement.src = work.imageUrl;

                // Créer un élément pour l'icône de suppression en utilisant FontAwesome
                const deleteIcon = document.createElement('i');
                deleteIcon.setAttribute('data-id', work.id); // Ajouter l'attribut data-id
                deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'delete-icon');
                deleteIcon.addEventListener('click', () => supprimerTravail(work.id)); // Ajouter la fonction de suppression

                const workElement = document.createElement('div');
                workElement.appendChild(imgElement);
                workElement.appendChild(deleteIcon);
                gallery.appendChild(workElement);
            });
        })
        .catch(error => console.error('Erreur:', error));
}

// Utilisation de la fonction pour récupérer les travaux lors de l'ouverture de la modal
openModalButton.addEventListener('click', () => {
    // Afficher la modale
    modal.style.display = 'block';

    // Appeler la fonction pour récupérer les travaux depuis le backend
    fetchWorksFromBackend();

    // Attacher un gestionnaire d'événements sur le bouton de fermeture de la modale
    const closeModalButton = modal.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
        // Masquer la modale
        modal.style.display = 'none';
    });
});
