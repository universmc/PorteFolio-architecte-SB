// Sélectionner le bouton d'ouverture de la modale
const openModalButton = document.getElementById('openModal');

// Sélectionner la modale
const modal = document.getElementById('modal');

// Attacher un gestionnaire d'événements sur le bouton d'ouverture de la modale
openModalButton.addEventListener('click', () => {
    // Afficher la modale
    modal.style.display = 'block';

    // Attacher un gestionnaire d'événements sur le bouton de fermeture de la modale
    const closeModalButton = modal.querySelector('.close-modale');
    closeModalButton.addEventListener('click', () => {
        // Masquer la modale
        modal.style.display = 'none';
    });
});

// Fonction pour créer la modale d'étape 1 - Galerie photo
function createStep1Modal() {
    const header = document.createElement('div');
    header.className = 'header-modal';
    header.innerHTML = `<button class="close-modale">X</button>`;

    const main = document.createElement('div');
    main.className = 'main-modal';
    // Ajouter le contenu de la galerie ici
    main.innerHTML = '<h2>Galerie photo</h2><div class="modalGallery">Votre galerie ici</div>';

    const footer = document.createElement('div');
    footer.className = 'footer-modal';
    footer.innerHTML = `<div class="lnBar"></div><button class="btn-ajouter-photo">Ajouter une photo</button>`;

    return { header, main, footer };
}

// Fonction pour créer la modale d'étape 2 - Ajout photo
function createStep2Modal() {
    const header = document.createElement('div');
    header.className = 'header-modal';
    header.innerHTML = `<button class="goPrev">[<]</button><button class="close-modale">X</button>`;

    const main = document.createElement('div');
    main.className = 'main-modal';
    // Ici, vous pouvez ajouter le formulaire d'ajout de photo
    main.innerHTML = '<h2>Ajout photo</h2><div class="form-content"><form><div class="photo-upload image-preview"><img class="img-prev" src="img-preview.png" alt="prev"><button class="add-img">+ Ajouter photo</button><span class="format-img">jpg, .png 4mo max></span><div class="form-group"><label for="titre">Titre</label><input type="text" id="titre" name="titre"></div><div class="form-group"><label for="categorie">Catégorie</label><select id="categorie" name="categorie"><option value="">Sélectionnez une catégorie</option></select></div><div class="form-group"></div>';

    const footer = document.createElement('div');
    footer.className = 'footer-modal';
    footer.innerHTML = `<div class="lnBar"></div><button type="submit" class="btn-submit">Valider</button></form></div>`;

    return { header, main, footer };
}

// Fonction pour créer la modale d'étape 3 - Aperçu après ajout
function createStep3Modal() {
    const header = document.createElement('div');
    header.className = 'header-modal';
    header.innerHTML = `<button class="goPrev">[<]</button><button class="close-modale">X</button>`;

    const main = document.createElement('div');
    main.className = 'main-modal';
   
````// Ici, vous pouvez ajouter l'aperçu de l'image ajoutée
main.innerHTML = '<h2>Ajout photo</h2><div class="form-content">Votre aperçu de l\'image ajoutée ici</div>';

const footer = document.createElement('div');
footer.className = 'footer-modal';
footer.innerHTML = `<div class="lnBar"></div><button class="btn-retour">Retour</button>`;

return { header, main, footer };
}

// Fonction pour créer et afficher la modale pour l'étape spécifiée
function displayModal(step) {
// Sélectionner le conteneur de la modale
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');

// Vider le contenu existant de la modale
modalContent.innerHTML = '';

// Créer les éléments de la modale en fonction de l'étape
let header, main, footer;
switch(step) {
case 1:
header = '<button class="close-modale">X</button>';
main = '<h2>Galerie photo</h2><div class="gallery">Votre galerie ici</div>';
footer = '<div class="lnBar"></div><button class="btn-ajouter-photo">Ajouter une photo</button>';
break;
case 2:
header = '<button class="goPrev">[<]</button><button class="close-modale">X</button>';
main = '<h2>Ajout photo</h2><div class="form-content"><form><div class="photo-upload image-preview"><img class="img-prev" src="img-preview.png" alt="prev"><button class="add-img">+ Ajouter photo</button><span class="format-img">jpg, .png 4mo max></span><div class="form-group"><label for="titre">Titre</label><input type="text" id="titre" name="titre"></div><div class="form-group"><label for="categorie">Catégorie</label><select id="categorie" name="categorie"><option value="">Sélectionnez une catégorie</option></select></div><div class="form-group"></div>';
footer = '<div class="lnBar"></div><button type="submit" class="btn-submit">Valider</button></form></div>';
break;
case 3:
header = '<button class="goPrev">[<]</button><button class="close-modale">X</button>';
main = '<h2>Ajout photo</h2><div class="form-content">Votre aperçu de l\'image ajoutée ici</div>';
footer = '<div class="lnBar"></div><button class="btn-retour">Retour</button>';
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
modalOverlay.style.display = 'block';

// Attacher l'événement de fermeture à tous les boutons close-modale
modalContent.querySelectorAll('.close-modale').forEach(button => {
button.addEventListener('click', () => {
modalOverlay.style.display = 'none';
});
});

// Si nécessaire, charger des données supplémentaires ou attacher d'autres événements
}

// Afficher la modale pour l'étape 1
displayModal(1);