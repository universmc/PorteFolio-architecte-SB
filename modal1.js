// Modal 1 FONCTION affichage galery + methode Delete
// affichage de donnée 
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(works => {
        const gallery = document.querySelector('.modalGallery');

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

function supprimerTravail(id) {
    const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}` // Utiliser le token dynamiquement
        }
    })
    .then(response => {
        if (response.ok) {
            const elementASupprimer = document.getElementById(`travail-${id}`);
            if (elementASupprimer) elementASupprimer.remove();
        } else {
            console.error('Erreur lors de la suppression:', response.statusText);
        }
    })
    .catch(error => console.error('Erreur:', error));
}
 
// Modal 1 btn ajouter ajouter photo (logic modal Go modal 2)

document.getElementById('btn-add-photo').addEventListener('click', function() {
    displayModal(2); // Change le contenu de la modale pour afficher l'étape 2
});