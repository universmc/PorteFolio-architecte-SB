document.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.getElementById('modalOverlay');
    const openModalBtn = document.getElementById('open-modal-btn');
    const modalContent = document.getElementById('modalContent');
    let imageSrc = null; // Image source initialized globally to be accessible across functions

    openModalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'block';
        displayModal(1); // Show the first step of the modal
    });

    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    function closeModal() {
        modalOverlay.style.display = 'none';
        modalContent.style.display = 'none';
        modalContent.innerHTML = '';
    }

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
    function createStep1Modal() {
        const header = createModalHeader();
        const title = document.createElement('h3');
        title.textContent = 'Gallery';
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
        addPhotoBtn.addEventListener('click', () => displayModal(2)); // Passage à la deuxième étape lors du clic
        footer.appendChild(addPhotoBtn);

        return { header, main, footer };
    }

    // Function createStep2Modal corrected
    function createStep2Modal() {
        const header = document.createElement('div');
        header.className = 'modal-header';
        
        // Bouton pour revenir à la galerie (goPrev) et pour fermer la modale ici...
        const goPrevButton = document.createElement('button');
        goPrevButton.className = 'goPrev';
        goPrevButton.textContent = '[<]'; // Texte du bouton, à ajuster selon vos besoins
        goPrevButton.addEventListener('click', () => displayModal(1)); // Revenir à l'étape 1 lors du clic
        header.appendChild(goPrevButton);
        // Bouton pour fermer la modale
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
        btnSubmit.textContent = 'Submit';

        btnSubmit.addEventListener('click', () => {
            if (validateForm()) { // Corrected to ensure form validation
                submitFinal(imageSrc, titreFormGroup.input.value, categorieFormGroup.select.value);
            }
        });

        footer.appendChild(btnSubmit);

        modalContent.innerHTML = '';
        modalContent.appendChild(header);
        modalContent.appendChild(form);
        modalContent.appendChild(footer);
        chargerCategories(categorieFormGroup.select);
        setupSubmitButton();
        return { header, main: form, footer };
    }

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

    // Corrections and additional functions here...
    function createFormGroup(id, labelText, type) {
        const group = document.createElement('div');
        group.className = 'form-group';
    
        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.textContent = labelText;
    
        let input;
        if (type === 'select') {
            input = document.createElement('select');
            input.innerHTML = '<option value="">Sélectionnez une catégorie</option>'; // Option par défaut
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

    function validateForm() {
        const titreInput = document.getElementById('titreInput');
        const categorieSelect = document.getElementById('categorie');

        const isImageSelected = imageSrc !== null;
        const isTitleFilled = titreInput && titreInput.value.trim() !== '';
        const isCategorySelected = categorieSelect && categorieSelect.value !== '';

        const btnSubmit = document.querySelector('.btn-submit');
        if (btnSubmit) {
            btnSubmit.disabled = !(isImageSelected && isTitleFilled && isCategorySelected);
            btnSubmit.style.backgroundColor = btnSubmit.disabled ? 'gray' : '#1D6154';
            btnSubmit.style.cursor = btnSubmit.disabled ? 'not-allowed' : 'pointer';
        }
    }
    function setupSubmitButton() {
        const btnSubmit = document.querySelector('.btn-submit');
        if (btnSubmit) {
            btnSubmit.addEventListener('click', () => {
                if (validateForm()) { // Si la validation est réussie
                    submitFinal(imageSrc, titreInput.value, categorieSelect.value);
                } else {
                    // Gérer l'échec de la validation ici, par exemple en affichant des messages d'erreur
                    console.error("Validation failed");
                }
            });
        }
    }
    function submitFinal(imageSrc, title, categoryId) {
        if (!imageSrc) {
            console.error("Image source not defined.");
            return;
        }
    
        const formData = new FormData();
    
        // Convert base64 image string to Blob if imageSrc is a base64 string
        if (typeof imageSrc === 'string' && imageSrc.startsWith('data:image')) {
            const byteString = atob(imageSrc.split(',')[1]);
            const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], {type: mimeString});
            formData.append('image', blob);
        } else {
            // Assume imageSrc is already a File object and append it directly
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
            // Handle successful submission (e.g., close modal, display success message, reload gallery)
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors (e.g., display error message to user)
        });
    }
    
    // Fonction helper pour convertir une chaîne Base64 en Blob
    function base64ToBlob(base64, contentType) {
        const sliceSize = 512;
        const byteCharacters = atob(base64.split(',')[1]);
        const slicesCount = Math.ceil(byteCharacters.length / sliceSize);
        const byteArrays = new Array(slicesCount);
    
        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            const begin = sliceIndex * sliceSize;
            const end = Math.min(begin + sliceSize, byteCharacters.length);
    
            const bytes = new Array(end - begin);
            for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, {type: contentType});
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

});