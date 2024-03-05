// Ajoute un écouteur d'événement pour DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialisation des éléments et des variables
  const modalOverlay = document.getElementById('modalOverlay'); // Cache-overley
  const openModalBtn = document.getElementById('open-modal-btn'); // Bouton d'ouverture de la modale
  const modalContent = document.getElementById('modalContent'); // Conteneur de la modale
  let imageSrc = null; // Source de l'image initialisée globalement
  // Initialisation des formulaires
  let titreFormGroup = {};
  let categorieFormGroup = {};

  titreFormGroup = createFormGroup('titreInput', 'Title', 'text');
  categorieFormGroup = createFormGroup('categorie', 'Category', 'select');

  // Affiche la modale lors du clic sur le bouton
  openModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'block';
    displayModal(1); // Affiche la première étape de la modale
  });

  // Ferme la modale lors du clic sur l'overlay
  modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) closeModal();
  });

  // Ferme la modale
  function closeModal() {
    modalOverlay.style.display = 'none';
    modalContent.style.display = 'none';
    modalContent.innerHTML = '';
    imageSrc = null; // Réinitialise l'image
  }

  // Crée l'en-tête de la modale
  function createModalHeader() {
    const header = document.createElement('div');
    header.className = 'modal-header';
    const closeButton = document.createElement('button');
    closeButton.className = 'close-modal';
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', closeModal);
    header.appendChild(closeButton);
    return header;
  }

  // Première étape de la modale : Galerie
  function createStep1Modal() {
    const header = createModalHeader();
    const title = document.createElement('h3');
    title.textContent = 'Gallery';
    header.appendChild(title);

    const main = document.createElement('div');
    main.className = 'main-modal';
    const gallery = document.createElement('div');
    gallery.className = 'modalGallery';

    // Charge et affiche les photos
    loadGallery(gallery);
    main.appendChild(gallery);

    const footer = document.createElement('div');
    footer.className = 'footer-modal';
    const addPhotoBtn = document.createElement('button');
    addPhotoBtn.textContent = 'Ajouter une photo';
    addPhotoBtn.addEventListener('click', () => displayModal(2)); // Passe à la deuxième étape lors du clic
    footer.appendChild(addPhotoBtn);

    return { header, main, footer };
  }

  // Deuxième étape de la modale : Formulaire d'ajout
  function createStep2Modal() {
    const header = createModalHeader();

    // Bouton pour revenir à la galerie (goPrev) et pour fermer la modale ici...
    const goPrevButton = document.createElement('button');
    goPrevButton.className = 'goPrev';
    goPrevButton.textContent = '[<]';
    goPrevButton.addEventListener('click', () => displayModal(1));
    header.appendChild(goPrevButton);

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
    
    const btnSubmit = document.createElement('button');
    btnSubmit.type = 'button';
    btnSubmit.className = 'btn-submit';
    btnSubmit.textContent = 'Submit';
    
    btnSubmit.addEventListener('click', () => {
    const isImageSelected = imageSrc !== null;
    const isTitleFilled = titreFormGroup.input.value.trim() !== '';
    const isCategorySelected = categorieFormGroup.select.value !== '';
    
    if (isImageSelected && isTitleFilled && isCategorySelected) {
    submitFinal(imageSrc, titreFormGroup.input.value, categorieFormGroup.select.value);
    }
    });
    
    form.appendChild(btnSubmit); // Ajoute le bouton de soumission dans le formulaire
    
    const footer = document.createElement('div');
    footer.className = 'footer-modal';
    
    modalContent.innerHTML = '';
    modalContent.appendChild(header);
    modalContent.appendChild(form);
    modalContent.appendChild(footer);
    chargerCategories(categorieFormGroup.select);
    setupSubmitButton();
    return { header, main: form, footer };
    }
    
    // Fonction pour afficher la modale en fonction de l'étape
    function displayModal(step) {
    let content;
    switch (step) {
    case 1:
    content = createStep1Modal();
    break;
    case 2:
    content = createStep2Modal();
    break;
    default:
    console.error('Unrecognized step');
    return;
    }
    modalContent.innerHTML = '';
    modalContent.appendChild(content.header);
    if (content.main) modalContent.appendChild(content.main);
    if (content.footer) modalContent.appendChild(content.footer);
    modalOverlay.style.display = 'block';
    modalContent.style.display = 'block';
    }
    
    // Fonction pour créer un groupe de formulaire
    function createFormGroup(id, labelText, type) {
    const group = document.createElement('div');
    group.className = 'form-group';
    
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = labelText;
    
    let input;
    if (type === 'select') {
    input = document.createElement('select');
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
    fetch('http://localhost:5678/api/categories')
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
    
    // Fonction pour soumettre le formulaire
    function submitFinal(imageSrc, title, categoryId) {
    if(!imageSrc) {
      console.error("Image source not defined.");
      return;
      }
      
      const formData = new FormData();
      
      // Convertit l'image en Blob si c'est une chaîne de base64
      if (typeof imageSrc === 'string' && imageSrc.startsWith('data:image')) {
      const byteString = atob(imageSrc.split(',')[1]);
      const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      formData.append('image', blob);
      } else {
      // Sinon, l'image est déjà un objet File, l'ajouter directement
      formData.append('image', imageSrc);
      }
      
      formData.append('title', title);
      formData.append('categoryId', categoryId);
      
      const token = localStorage.getItem('token');
      
      fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
      'Authorization': `Bearer ${token}`
      },
      body: formData
      })
      .then(response => {
      if (!response.ok) {
      throw new Error('Submission failed.');
      }
      return response.json();
      })
      .then(data => {
      console.log('Success:', data);
      // Rafraîchit la galerie après la soumission réussie
      loadGallery(document.getElementById('gallery'));
      // Ferme la modale et réinitialise les variables après la soumission
      closeModal();
      imageSrc = null;
      titreFormGroup.input.value = '';
      categorieFormGroup.select.value = '';
      })
      .catch(error => {
      console.error('Error:', error);
      // Affiche un message d'erreur à l'utilisateur
      });
      }
      
      // Fonction pour gérer le bouton "Submit"
      function setupSubmitButton() {
      const btnSubmit = document.querySelector('.btn-submit');
      
      btnSubmit.addEventListener('click', () => {
      if (validateForm()) {
      submitFinal(imageSrc, titreFormGroup.input.value, categorieFormGroup.select.value);
      }
      });
      }
      
      // Fonction pour afficher la modale en fonction de l'étape
      function displayModal(step) {
      let content;
      switch (step) {
      case 1:
      content = createStep1Modal();
      break;
      case 2:
      content = createStep2Modal();
      break;
      default:
      console.error('Unrecognized step');
      return;
      }
      modalContent.innerHTML = '';
      modalContent.appendChild(content.header);
      if (content.main) modalContent.appendChild(content.main);
      if (content.footer) modalContent.appendChild(content.footer);
      modalOverlay.style.display = 'block';
      modalContent.style.display = 'block';
      }
      
      // Initialise les variables globales
      let titreFormGroup = {};
      let categorieFormGroup = {};
      
      // Affiche la première étape de la modale
      displayModal(1);