// Chargement du DOM

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");

// ouverture de la modal dev openModal.js

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

// Création de la modal 

function createStep1Modal() {
    const header = document.createElement('div');
    header.className = 'header-modal';
    header.innerHTML = `<button class="close">X</button>`;

    const main = document.createElement('div');
    main.className = 'main-modal';
    // Ajouter le contenu de la galerie ici
    main.innerHTML = `
    <h2>Galerie photo</h2>
    <div class="modalGallery"></div>
    `;

    const footer = document.createElement('div');
    footer.className = 'footer-modal';
    footer.innerHTML = `
    <div class="lnBar"></div>
    <button id="btn-add-photo" class="btn-ajouter-photo">Ajouter une photo</button>
    `;

    return { header, main, footer };
}

function createStep2Modal() {
    const header = document.createElement('div');
    header.className = 'header-modal';
    header.innerHTML = `
    <button class="goPrev">[<]</button><button class="close">X</button>
    `;

    const form = document.createElement('form');
    form.className = 'form-content';
    form.innerHTML = `
        <h2>Ajout photo</h2>
        <div class="photo-upload image-preview">
            <img class="img-prev" src="img-preview.png" alt="prev">
            <button class="add-img">
                <input type="file" id="addImgButton" accept="image/png, image/jpeg" />+ajoutez photo
            </button>
            <span class="format-img">jpg, .png 4mo max</span>
        </div>
        <div class="form-group">
            <label for="titre">Titre</label>
            <input type="text" id="titre" name="titre">
        </div>
        <div class="form-group">
            <label for="categorie">Catégorie</label>
            <select id="categorie" name="categorie">
                <option value="">Sélectionnez une catégorie</option>
            </select>
        </div>
        <div class="lnBar"></div>
        <button type="submit" class="btn-submit">Valider</button>
    `;

    const main = document.createElement('div');
    main.className = 'main-modal';
    main.appendChild(form); // Ajouter le formulaire au main !!!!

    const footer = document.createElement('div');
    footer.className = 'footer-modal';
    // Le footer peut contenir d'autres éléments si nécessaire

    return { header, main, footer };
}


// Fonction pour créer la modale d'étape 3 - Aperçu après ajout
function createStep3Modal() {
    const header = document.createElement('div');
    header.className = `header-modal`;
    header.innerHTML = `<button class="goPrev">[<]</button><button class="close">X</button>`;

    const main = document.createElement('div');
    main.className = `main-modal`;
    // Ici, vous pouvez ajouter le formulaire d'ajout de photo !!!
    main.innerHTML = `
    <h2>Ajout photo</h2>
        <div class="form-content">
        <form>
        <div class="photo-upload image-preview">
            <img class="img-prev" src="img-preview.png" alt="prev">
            <button class="add-img">+ Ajouter photo</button>
            <span class="format-img">jpg, .png 4mo max></span>
            <div class="form-group"><label for="titre">Titre</label>
                <input type="text" id="titre" name="titre"></div><div class="form-group">
                <label for="categorie">Catégorie</label><select id="categorie" name="categorie"><option value="">Sélectionnez une catégorie</option></select></div>
                <div class="form-group">
                </div>`;

    const footer = document.createElement('div');
    footer.className = `footer-modal`;
    footer.innerHTML = `<div class="lnBar"></div><button type="submit" class="btn-submit">Valider</button></form></div>`;

    return { header, main, footer };
}

// Fonction pour créer et afficher la modale pour l'étape spécifiée
function displayModal(step) {
    // Sélectionner le conteneur de la modale
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');

    // Vider le contenu existant de la modale
    modalContent.innerHTML = ``;

    // Créer les éléments de la modale en fonction de l'étape
    let header, main, footer;
    switch(step) {
        case 1:
            header = `<button class="close">X</button>`;
            main = `<h2>Galerie photo</h2><div class="modalGallery"></div>`;
            footer = `<div class="lnBar"></div><button id="btn-add-photo" class="btn-ajouter-photo">Ajouter une photo</button>`;
            break;
        case 2:
            header = `<button class="goPrev">[<]</button><button class="close">X</button>`;
            main = `<h2>Ajout photo</h2><div class="form-content"><form><div class="photo-upload image-preview"><img class="img-prev" src="img-preview.png" alt="prev"><button class="add-img"><input type="file" id="addImgButton">+ajoutez photo</button><span class="format-img">jpg, .png 4mo max></span></div><div class="form-group"><label for="titre">Titre</label><input type="text" id="titre" name="titre"></div><div class="form-group"><label for="categorie">Catégorie</label><select id="categorie" name="categorie"><option value="">Sélectionnez une catégorie</option></select></div></form>`;
            footer = `<div class="lnBar"></div><button type="submit" class="btn-submit">Valider go step</button>`;
            break;
        case 3:
            header = `<button class="goPrev">[<]</button><button class="close">X</button>`;
            main = `<h2>Ajout photo</h2><div class="form-content"><form><div class="photo-upload image-preview"><img class="img-prev" src="img-preview.png" alt="prev"><button class="add-img">+ Ajouter photo</button><span class="format-img">jpg, .png 4mo max></span></div><div class="form-group"><label for="titre">Titre</label><input type="text" id="titre" name="titre"></div><div class="form-group"><label for="categorie">Catégorie</label><select id="categorie" name="categorie"><option value="">Sélectionnez une catégorie</option></select></div><div class="form-group"></div></form>`;
            footer = `<div class="lnBar"></div><button type="submit" class="btn-submit">Valider</button>`;
            break;
        default:
            console.error('Étape non reconnue');
            return;
    }

    // Ajouter les éléments créés au contenu de la modale
    modalContent.innerHTML = `
        <div class='header-modal'>${header}</div>
        <div class='main-modal'>${main}</div>
        <div class='footer-modal'>${footer}</div>
    `;

    // Afficher la modale
    modalOverlay.style.display = 'none';

    // Attacher l'événement de fermeture à tous les boutons close-modale
    modalContent.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
            modalContent.style.display = 'none';
        });
    });

    // Si nécessaire, charger des données supplémentaires ou attacher d'autres événements
}
// Afficher la modale pour l'étape 1
displayModal(1);


// Modal 1 FONCTION affichage galery + methode Delete
// affichage de donnée 
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
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


// modal 2
// Revenir à l'affichage de l'Étape 1

document.querySelector('.goPrev').addEventListener('click', function() {
    displayModal(1); // Revenir à l'affichage de l'Étape 1
});

// Simuler un clic sur l'input file caché lorsque l'utilisateur clique sur le bouton d'ajout d'image
addImgButton.addEventListener('click', () => {
    document.getElementById('hiddenFileInput').click();
  });
  
  // Écouteur d'événement pour l'input file caché
  const fileInput = document.getElementById('hiddenFileInput');
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file.size > 4 * 1024 * 1024) { // Taille en octets pour 4 Mo
      alert("Le fichier est trop grand ! La taille maximale est de 4 Mo.");
      // Réinitialiser l'input file
      fileInput.value = '';
    } else {
      // Gérer le fichier sélectionné
    }
  });

});
// btn ajouter img avec
