// Déclaration des variables globales
document.addEventListener("DOMContentLoaded", () => {
const modalOverlay = document.getElementById('modalOverlay');
const openModalBtn = document.getElementById('open-modal-btn');
const modalContent = document.getElementById('modalContent');
let imageSrc = null; // Source de l'image

// Fonction pour afficher la modale
function displayModal() {
  modalOverlay.style.display = 'block';
  modalContent.style.display = 'block';
}

// Fonction pour fermer la modale
function closeModal() {
  modalOverlay.style.display = 'none';
  modalContent.style.display = 'none';
  modalContent.innerHTML = ''; // Vider le contenu de la modale
}

// Fonction pour créer le contenu de la première étape (galerie)
function createStep1Modal() {
  const header = createModalHeader();
  const title = document.createElement('h3');
  title.textContent = 'Galerie';
  header.appendChild(title);

  const main = document.createElement('div');
  main.className = 'main-modal';
  const gallery = document.createElement('div');
  gallery.className = 'modalGallery';
  loadGallery(gallery); // Chargement et affichage des photos

  main.appendChild(gallery);

  const footer = document.createElement('div');
  footer.className = 'footer-modal';
  const addPhotoBtn = document.createElement('button');
  addPhotoBtn.textContent = 'Ajouter une photo';
  addPhotoBtn.addEventListener('click', () => displayStep2Modal()); // Accéder à la deuxième étape

  footer.appendChild(addPhotoBtn);

  return { header, main, footer };
}

// Fonction pour créer le contenu de la deuxième étape (formulaire d'ajout)
function createStep2Modal() {
  const header = createModalHeader();
  const goPrevButton = document.createElement('button');
  goPrevButton.className = 'goPrev';
  goPrevButton.textContent = '[<]';
  goPrevButton.addEventListener('click', displayStep1Modal); // Revenir à l'étape 1
  header.appendChild(goPrevButton);

  const closeButton = document.createElement('button');
  closeButton.className = 'close-modal';
  closeButton.textContent = 'X';
  closeButton.addEventListener('click', closeModal);
  header.appendChild(closeButton);

  const form = document.createElement('form');
  form.className = 'form-content';
  form.setAttribute('enctype', 'multipart/form-data');

  const photoUpload = document.createElement('div');
  photoUpload.className = 'photo-upload image-preview';
  const imgPreview = document.createElement('img');
  imgPreview.className = 'img-prev';
  imgPreview.src = 'img-preview.png';

  const addImgLabel = document.createElement('label');
  addImgLabel.setAttribute('for', 'addImgButton');
  addImgLabel.className = 'add-img';
  addImgLabel.textContent = '+ Add Photo';

  const addImgButton = document.createElement('input');
  addImgButton.type = 'file';
  addImgButton.id = 'addImgButton';
  addImgButton.name = 'image';
  addImgButton.accept = 'image/png, image/jpeg';
  addImgButton.style.display = 'none';

  addImgButton.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      imageSrc = e.target.result;
      imgPreview.src = imageSrc;
    };
    reader.readAsDataURL(file);
  });

  photoUpload.appendChild(imgPreview);
  photoUpload.appendChild(addImgLabel);
  photoUpload.appendChild(addImgButton);

  const titreFormGroup = createFormGroup('titreInput', 'Title', 'text');
  const categorieFormGroup = createFormGroup('categorie', 'Category', 'select');

  form.appendChild(photoUpload);
  form.appendChild(titreFormGroup.group);
  form.appendChild(categorieFormGroup.group);

  const footer = document.createElement('div');
  footer.className = 'footer-modal';

  const btnSubmit = document.createElement('button');
  btnSubmit.type = 'button';
  btnSubmit.className = 'btn-submit';
  btnSubmit.textContent =  btnSubmit.textContent = 'Submit';

  // Ajout d'un écouteur d'événement pour la validation et la soumission du formulaire
  btnSubmit.addEventListener('click', () => {
    if (validateForm()) { // Valider le formulaire avant la soumission
      submitFinal(imageSrc, titreFormGroup.input.value, categorieFormGroup.select.value);
    }
  });

  footer.appendChild(btnSubmit);

  modalContent.innerHTML = '';
  modalContent.appendChild(header);
  modalContent.appendChild(form);
  modalContent.appendChild(footer);

  chargerCategories(categorieFormGroup.select); // Charger les catégories depuis l'API

  return { header, main: form, footer };
}

// Fonction pour créer un groupe de formulaire (réutilisable)
function createFormGroup(id, labelText, type) {
  const group = document.createElement('div');
  group.className = 'form-group';

  const label = document.createElement('label');
  label.setAttribute('for', id);
  label.textContent = labelText;

  let input;
  if (type === 'select') {
    input = document.createElement('select');
    input.innerHTML = '<option value="">Sélectionnez une catégorie</option>';
  } else {
    input = document.createElement('input');
    input.type = type;
  }
  input.id = id;
  input.name = id;

  group.appendChild(label);
  group.appendChild(input);

  return { group, input: input, select: input }; // Renvoie également input sous le nom de select pour une utilisation simplifiée
}

// Fonction pour charger les catégories depuis l'API
function chargerCategories(selectElement) {
  fetch('http://localhost:5678/api/categories') // Remplacer par votre URL d'API
    .then(response => response.json())
    .then(categories => {
      selectElement.innerHTML = '<option value="">Sélectionnez une catégorie</option>';
      categories.forEach(categorie => {
        const option = document.createElement('option');
        option.value = categorie.id;
        option.textContent = categorie.name;
        selectElement.appendChild(option);
      });
    })
    .catch(error => console.error('Erreur lors du chargement des catégories:', error));
}

// Fonction pour valider le formulaire (vérifie si tous les champs sont remplis)
function validateForm() {
  const isImageSelected = imageSrc !== null;
  const isTitleFilled = titreFormGroup.input.value.trim() !== '';
  const isCategorySelected = categorieFormGroup.select.value !== '';

  // Mise à jour de l'état du bouton "Submit" en fonction de la validation
  if (btnSubmit) {
    btnSubmit.disabled = !(isImageSelected && isTitleFilled && isCategorySelected);
    btnSubmit.style.backgroundColor = btnSubmit.disabled ? 'gray' : '#1D6154';
    btnSubmit.style.cursor = btnSubmit.disabled ? 'not-allowed' : 'pointer';
  }

  return isImageSelected && isTitleFilled && isCategorySelected; // Retourne true seulement si toutes les conditions sont remplies
}

// Fonction pour soumettre le formulaire final (remplacer par votre logique de soumission)
function submitFinal(imageSrc, title, categoryId) {
  // ... Votre logique de soumission de formulaire (e.g., fetch vers votre API)
  console.log('Formulaire soumis avec les données:', { imageSrc, title, categoryId });
}

// Ajout d'un écouteur d'événement au clic sur le bouton "Ouvrir la modale"
openModalBtn.addEventListener('click', displayStep1Modal);

async function loadGallery(galleryElement) {
    try {
        const response = await fetch('http://localhost:5678/api/works/'); // Replace with your API endpoint
        if (!response.ok) {
            throw new Error('Erreur lors du chargement de la galerie');
        }

        const works = await response.json();
        galleryElement.innerHTML = ''; // Vider le contenu de la galerie avant de la recharger

        works.forEach(work => {
            const imgElement = document.createElement('img');
            // Populate image source based on work data (e.g., imgElement.src = work.imageUrl;)
            galleryElement.appendChild(imgElement); // Add the image to the gallery
        });
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// **Fonction de suppression d'un travail (implémentez la logique de suppression en fonction de votre backend):**
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

// ... (rest of the code)
});