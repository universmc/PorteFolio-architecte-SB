// **Écouteur d'événement DOMContentLoaded:**
document.addEventListener("DOMContentLoaded", () => {
    // **Récupération des éléments du DOM:**
    const modalOverlay = document.getElementById('modalOverlay');
    const openModalBtn = document.getElementById('open-modal-btn');
    const modalContent = document.getElementById('modalContent');

    // **Ouverture et fermeture de la modale:**
    // Ouvrir la modale principale
    openModalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'block';
        displayModal(1); // Affiche la première étape
    });

    // Fermer la modale en cliquant sur l'overlay
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // Fonction pour fermer la modale
    function closeModal() {
        modalOverlay.style.display = 'none';
        modalContent.style.display = 'none';
        modalContent.innerHTML = ''; // Nettoie le contenu précédent
    }

    // **Étapes de la modale:**
    function createModalHeader(hasCloseButton = false) {
        const header = document.createElement('div');
        header.className = 'modal-header';
    
        // **Ajout du titre**
        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'close-modal';
        closeButton.textContent = 'X';
        closeButton.addEventListener('click', closeModal);
        header.appendChild(closeButton);
        const title = document.createElement('h2');
        title.textContent = 'Portfolio';
        header.appendChild(title);
    
        return header;
    }
    
    // Fonction pour créer la première étape de la modale (Galerie)
    function createStep1Modal() {
        const header = createModalHeader();
        const main = document.createElement('div');
        main.className = 'main-modal';

        // Créer la galerie sans utiliser innerHTML
        const gallery = document.createElement('div');
        gallery.className = 'modalGallery';

        // Charger et afficher les éléments de la galerie
        loadGallery(gallery);

        main.appendChild(gallery);

        const footer = document.createElement('div');
        footer.className = 'footer-modal';

        // **Ajout des boutons sans utiliser innerHTML:**
        const btnAddPhoto = document.createElement('button');
        btnAddPhoto.id = 'btn-add-photo';
        btnAddPhoto.className = 'btn-ajouter-photo';
        btnAddPhoto.textContent = 'Ajouter une photo';
        btnAddPhoto.addEventListener('click', () => displayModal(2));

        footer.appendChild(btnAddPhoto);

        // **Mettre à jour l'innerHTML de modalContent**
        modalContent.innerHTML = ''; // Nettoie le contenu précédent
        modalContent.appendChild(header);
        modalContent.appendChild(main);
        modalContent.appendChild(footer);

        return { header, main, footer };
    }

    // Fonction pour créer la deuxième étape de la modale (Ajout de photo)
    function createStep2Modal() {
        let imageSrc = null; // Initialisez imageSrc à null
        const header = createModalHeader(true, true);
        const form = document.createElement('form');
        form.className = 'form-content';
        form.setAttribute('enctype', 'multipart/form-data');

        function createModalHeader(hasCloseButton, hasGoPrevButton) {
            // Création du conteneur de l'en-tête
            const header = document.createElement('div');
            header.className = 'modal-header';
            // Ajout du bouton "Précédent"
            if (hasGoPrevButton) {
                const goPrevButton = document.createElement('button');
                goPrevButton.type = 'button';
                goPrevButton.className = 'go-prev-modal';
                goPrevButton.textContent = '‹ Précédent';
                goPrevButton.addEventListener('click', () => displayModal(1));
                header.appendChild(goPrevButton);
            }
            // Ajout du bouton de fermeture
            if (hasCloseButton) {
                const closeButton = document.createElement('button');
                closeButton.type = 'button';
                closeButton.className = 'close-modal';
                closeButton.textContent = 'X';
                closeButton.addEventListener('click', closeModal);
                header.appendChild(closeButton);
            }
        
            // Ajout du titre
            const title = document.createElement('h2');
            title.textContent = 'Ajouter une photo';
            header.appendChild(title);
        
            return header;
        }

        // Créer le formulaire sans utiliser innerHTML
        const photoUpload = document.createElement('div');
        photoUpload.className = 'photo-upload image-preview';
        const imgPreview = document.createElement('img');
        imgPreview.className = 'img-prev';
        imgPreview.src = 'img-preview.png';
        imgPreview.alt = 'Aperçu de image';


        const addImgLabel = document.createElement('label');
        addImgLabel.setAttribute('for', 'addImgButton');
        addImgLabel.className = 'add-img';
        addImgLabel.textContent = '+ Ajoutez photo';

        const addImgButton = document.createElement('input');
        addImgButton.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                imageSrc = event.target.result; // Assignez la base64 à imageSrc
                imgPreview.src = imageSrc; // Prévisualisez l'image
            };
            reader.readAsDataURL(file);
        });
        addImgButton.type = 'file';
        addImgButton.id = 'addImgButton';
        addImgButton.name = 'image';
        addImgButton.accept = 'image/png, image/jpeg';
        addImgButton.style.display = 'none';

        const formatImg = document.createElement('span');
        formatImg.className = 'format-img';
        formatImg.textContent = 'jpg, .png 4mo max';

        photoUpload.appendChild(imgPreview);
        photoUpload.appendChild(addImgLabel);
        photoUpload.appendChild(addImgButton);
        photoUpload.appendChild(formatImg);


        const titreFormGroup = document.createElement('div');
        titreFormGroup.className = 'form-group';

        const titreLabel = document.createElement('label');
        titreLabel.setAttribute('for', 'titreInput');
        titreLabel.textContent = 'Titre';

        const titreInput = document.createElement('input');
        titreInput.type = 'text';
        titreInput.id = 'titreInput';
        titreInput.name = 'title';

        titreFormGroup.appendChild(titreLabel);
        titreFormGroup.appendChild(titreInput);

        const categorieFormGroup = document.createElement('div');
        categorieFormGroup.className = 'form-group';

        const categorieLabel = document.createElement('label');
        categorieLabel.setAttribute('for', 'categorie');
        categorieLabel.textContent = 'Catégorie';

        const categorieSelect = document.createElement('select');
        categorieSelect.id = 'categorie';
        categorieSelect.name = 'categoryId';

        categorieFormGroup.appendChild(categorieLabel);
        categorieFormGroup.appendChild(categorieSelect);

        
        form.appendChild(photoUpload);
        form.appendChild(titreFormGroup);
        form.appendChild(categorieFormGroup);

        const footer = document.createElement('div');
        footer.className = 'footer-modal';



        const btnSubmit = document.createElement('button');
        btnSubmit.type = 'button';
        btnSubmit.className = 'btn-submit';
        btnSubmit.textContent = 'Envoyer';
        btnSubmit.addEventListener('click', () => {
            const title = titreInput.value;
            const categoryId = categorieSelect.value;
            displayModal(3, imageSrc, title, categoryId); // Passez imageSrc
        });
        footer.appendChild(btnSubmit);

        // **Mettre à jour l'innerHTML de modalContent**
        modalContent.innerHTML = ''; // Nettoie le contenu précédent
        modalContent.appendChild(header);
        modalContent.appendChild(form);
        modalContent.appendChild(footer);

        // Chargement des catégories
        chargerCategories(categorieSelect);

        return { header, main: form, footer };
    }

    // Fonction pour créer la troisième étape de la modale (Confirmation et prévisualisation)
    function createStep3Modal(imageSrc, title, categoryId) {
        const header = createModalHeader(true, true);
        const form = document.createElement('form');
        form.className = 'form-content';
        form.setAttribute('enctype', 'multipart/form-data');
      
        // Prévisualisation de l'image
        const imgPreview = document.createElement('img');
        imgPreview.className = 'img-prev';
        imgPreview.src = imageSrc; // Utiliser imageSrc transmis à cette fonction
        imgPreview.alt = 'Aperçu de l\'image';
        form.appendChild(imgPreview);
      
        // Titre et catégorie (pour confirmation)
        const titreLabel = document.createElement('label');
        titreLabel.textContent = 'Titre:';
        form.appendChild(titreLabel);
      
        const titreValue = document.createElement('span');
        titreValue.textContent = title;
        form.appendChild(titreValue);
      
        const categorieLabel = document.createElement('label');
        categorieLabel.textContent = 'Catégorie:';
        form.appendChild(categorieLabel);
      
        const categorieValue = document.createElement('span');
        categorieValue.textContent = categoryId;
        form.appendChild(categorieValue);
      
        const footer = document.createElement('div');
        footer.className = 'footer-modal';
      
        const btnValider = document.createElement('button');
        btnValider.type = 'submit'; // Change to submit button
        btnValider.className = 'btn-valider';
        btnValider.textContent = 'Confirmer';
        footer.appendChild(btnValider);
      
        // Mettre à jour le contenu de la modal
        modalContent.innerHTML = '';
        modalContent.appendChild(header);
        modalContent.appendChild(form);
        modalContent.appendChild(footer);
      
        return { header, main: form, footer };
      }

    // **Fonction pour afficher la modale en fonction de l'étape:**
    function displayModal(step, imageSrc = '', title = '', categoryId = '') {
        let content;
        switch (step) {
            case 1:
                content = createStep1Modal();
                break;
            case 2:
                content = createStep2Modal(imageSrc, title, categoryId);
                break;
            case 3:
                content = createStep3Modal(imageSrc, title, categoryId);
                break;
            default:
            console.error('Étape non reconnue');
            return;
        }

        // **Mettre à jour l'innerHTML de modalContent**
        modalContent.innerHTML = ''; // Nettoie le contenu précédent
        modalContent.appendChild(content.header);
        modalContent.appendChild(content.main);
        modalContent.appendChild(content.footer);

        modalOverlay.style.display = 'block';
        modalContent.style.display = 'block';
    }
    // addeventListener submitFinal .btn-Valider
    const form = document.querySelector('form'); 
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
    
      const imageSrc = document.querySelector('input[name="image"]').files[0]; // Get the image file
      const title = document.querySelector('input[name="title"]').value;
      const categoryId = document.querySelector('select[name="category"]').value;
    
      submitFinal(imageSrc, title, categoryId); // Call submitFinal with correct data
    });
    function submitFinal(imageSrc, title, categoryId,) {
        // Préparation des données
        const formData = new FormData();
        formData.append('title', title);
        formData.append('imageUrl', imageSrc);
        formData.append('categoryId', categoryId);
        formData.append('userId', 'ID_utilisateur');
        formData.append('workId', workId);
      
        const token = localStorage.getItem('token');
      
        // Envoi des données
        fetch('http://localhost:5678/api/works', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Erreur lors de l\'ajout du travail');
          }
        })
        .then(data => {
          console.log('Success:', data);
          closeModal(); // Or display success message
          // Update gallery (implement logic to add new work to gallery)
          loadGallery(document.getElementById('Gallery')); 
        })
        .catch((error) => {
          console.error('Error:', error);
          // ...
        });
      }
      const btnValiderElements = document.querySelectorAll('.btn-valider');

      btnValiderElements.forEach((btnValider) => {
        btnValider.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default form submission
      
          const form = event.currentTarget.closest('form'); // Get the parent form
          const imageSrc = form.querySelector('input[name="image"]').files[0];
          const title = form.querySelector('input[name="title"]').value;
          const categoryId = form.querySelector('select[name="category"]').value;
      
          submitFinal(imageSrc, title, categoryId);
        });
      });
    // **Fonction de chargement des catégories depuis le backend:**
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
    // **Fonction de conversion d'image en base64 (exemple utilisant FileReader):**
    function convertToBase64(imageSrc) {
        return new Promise((resolve, reject) => {
            if (typeof imageSrc === 'string' && imageSrc.startsWith('http')) {
                fetch(imageSrc)
                    .then(response => response.blob())
                    .then(blob => {
                        const reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = reject;
                    })
                    .catch(reject);
            } else {
                // imageSrc est déjà un Blob ou une DataURL
                resolve(imageSrc);
            }
        });
    }



    // **Fonction de chargement et d'affichage des éléments de la galerie:**
    async function loadGallery(galleryElement) {
        try {
            const response = await fetch('http://localhost:5678/api/works');
            if (!response.ok) {
                throw new Error('Erreur lors du chargement de la galerie');
            }
    
            const works = await response.json();
            galleryElement.innerHTML = ''; // Clear existing content
    
            works.forEach(work => {
                const imgElement = document.createElement('img');
                imgElement.src = work.imageUrl;
    
                // Create a deletion icon element using FontAwesome
                const deleteIcon = document.createElement('i');
                deleteIcon.setAttribute('data-id', work.id); // Add data-id attribute
                deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'delete-icon');
    
                // Add event listener for deletion
                deleteIcon.addEventListener('click', () => supprimerTravail(work.id));
    
                const workElement = document.createElement('div');
                workElement.appendChild(imgElement);
                workElement.appendChild(deleteIcon);
                galleryElement.appendChild(workElement);
            });
        } catch (error) {
            console.error('Erreur lors du chargement de la galerie:', error);
            // Handle potential error scenarios (e.g., display an error message to the user)
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
    

    // **Fonctions utilitaires (optionnelles):**

    // Fonction pour afficher un message d'erreur
    function showError(message) {
        const errorElement = document.getElementById('errorMessage');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Fonction pour masquer le message d'erreur
    function hideError() {
        const errorElement = document.getElementById('errorMessage');
        errorElement.style.display = 'none';
    }

    
    // **Appel de la fonction d'ouverture de la modale:**
    // openModalBtn.click(); // Décommenter pour ouvrir la modale automatiquement

}); // Fin de l'écouteur d'événement DOMContentLoaded