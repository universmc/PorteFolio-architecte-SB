// Chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.getElementById('modalOverlay');
    const openModalBtn = document.getElementById('open-modal-btn');
    const modal = document.getElementById('modalContent');

    // Ouverture de la modale principale
    openModalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'block';
        displayModal(1); // Affiche la première étape de la modale
    });

    // Fermeture de la modale en cliquant sur l'overlay
    modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });

    // Fermeture de la modale
    function closeModal() {
        modalOverlay.style.display = 'none';
        modalContent.style.display = 'none';
    }

    // Création de la première étape de la modale (Galerie)
    function createStep1Modal() {
        const header = createModalHeader(true);
        const main = document.createElement('div');
        main.className = 'main-modal';
        main.innerHTML = `<h2>Galerie photo</h2><div class="modalGallery"></div>`;

        const footer = document.createElement('div');
        footer.className = 'footer-modal';
        footer.innerHTML = `<div class="lnBar"></div><button id="btn-add-photo" class="btn-ajouter-photo">Ajouter une photo</button>`;

        // Ajout d'un écouteur d'événements sur le bouton pour passer à la deuxième étape
        footer.querySelector('#btn-add-photo').addEventListener('click', () => displayModal(2));
        loadGallery();
        return { header, main, footer };
    }

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



// FONCTION Modal 1 btn ajouter ajouter photo (logic modal Go modal 2)

function loadGallery() {
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
}

    // Création de la deuxième étape de la modale (Ajout de photo)
    function createStep2Modal() {
        const header = createModalHeader();
        const form = document.createElement('form');
        form.className = 'form-content';
        form.setAttribute('enctype', 'multipart/form-data');
        form.innerHTML = `
            <h2>Ajout photo</h2>
            <div class="photo-upload image-preview">
                <img class="img-prev" src="img-preview.png" alt="Aperçu de l'image">
                <label for="addImgButton" class="add-img">+ Ajoutez photo</label>
                <input type="file" id="addImgButton" name="image" accept="image/png, image/jpeg" style="display: none;">
                <span class="format-img">jpg, .png 4mo max</span>
            </div>
            <div class="form-group">
                <label for="titreInput">Titre</label>
                <input type="text" id="titreInput" name="title">
            </div>
            <div class="form-group">
                <label for="categorie">Catégorie</label>
                <select id="categorie" name="categoryId">
                    <option value="">Sélectionnez une catégorie</option>
                </select>
            </div>
        `;
        

        const main = document.createElement('div');
        main.className = 'main-modal';
        main.appendChild(form);

        const footer = document.createElement('div');
        footer.className = 'footer-modal';
        footer.innerHTML = `<div class="lnBar"></div><button type="button" class="btn-preview">Prévisualiser</button>`;

        // Configuration des écouteurs d'événements pour la prévisualisation et le chargement des catégories
        setupFormListeners(form, footer.querySelector('.btn-preview'));
        chargerCategories();

        return { header, main, footer };
    }

    // Configuration des écouteurs d'événements pour le formulaire
    function setupFormListeners(form, previewBtn) {
        previewBtn.addEventListener('click', () => {
            const imageSrc = form.querySelector('.img-prev').src;
            const title = form.querySelector('#titreInput').value;
            const categoryId = form.querySelector('#categorie').value;
            displayModal(3, imageSrc, title, categoryId); // Affiche la modal 3 pour prévisualisation
        });
    }

    // Création de la troisième étape de la modale (Confirmation et prévisualisation)
    function createStep3Modal(imageSrc, title, categoryId) {
        const header = createModalHeader();
        const main = document.createElement('div');
        main.className = 'main-modal';
        main.innerHTML = `
            <h2>Prévisualisation de la photo</h2>
            <img src="${imageSrc}" alt="Prévisualisation" class="preview-img">
            <p>Titre: ${title}</p>
            <p>Catégorie ID: ${categoryId}</p>
        `;

        const footer = document.createElement('div');
        footer.className = 'footer-modal';
        footer.innerHTML = `<div class="lnBar"></div><button type="button" class="btn-submit">Envoyer</button>`;

        // Ajout d'un écouteur pour le bouton d'envoi final
        footer.querySelector('.btn-submit').addEventListener('click', () => submitFinal(imageSrc, title, categoryId));

        return { header, main, footer };
    }

    // Affichage de la modale en fonction de l'étape
    function displayModal(step, imageSrc = '', title = '', categoryId = '') {
        let content;
        switch (step) {
            case 1:
                content = createStep1Modal();
                break;
            case 2:
                content = createStep2Modal();
                break;
            case 3:
                content = createStep3Modal(imageSrc, title, categoryId);
                break;
            default:
                console.error('Étape non reconnue');
                return;
        }

        // Ajout du contenu à la modale et affichage
        modalContent.innerHTML = ''; // Nettoie le contenu précédent
        modalContent.appendChild(content.header);
        modalContent.appendChild(content.main);
        modalContent.appendChild(content.footer);
        modalOverlay.style.display = 'block';
        modal.style.display = 'block';
    }

    // Soumission finale des données au backend
    function submitFinal(imageSrc, title, categoryId) {
        // Préparation des données à envoyer
        const formData = new FormData();
        formData.append('title', title);
        formData.append('imageUrl', imageSrc);
        formData.append('categoryId', categoryId);
        // L'ID de l'utilisateur doit être récupéré selon votre logique d'authentification
        formData.append('userId', 'ID_utilisateur');

        // Envoi des données au backend
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`, // Assurez-vous d'avoir le token
            },
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
            // Ici, vous pouvez gérer la réussite, par exemple en affichant un message de succès ou en passant à la Modal 3
            closeModal(); // Ferme la modale après la soumission réussie
        })
        .catch((error) => {
            console.error('Error:', error);
            // Ici, vous pouvez gérer l'erreur, par exemple en affichant un message d'erreur à l'utilisateur
        });
    }

    // Chargement des catégories depuis le backend
    function chargerCategories() {
        fetch('http://localhost:5678/api/categories')
            .then(response => response.json())
            .then(categories => {
                const selectCategorie = document.getElementById('categorie');
                selectCategorie.innerHTML = '<option value="">Sélectionnez une catégorie</option>';
                categories.forEach(categorie => {
                    const option = document.createElement('option');
                    option.value = categorie.id;
                    option.textContent = categorie.nom;
                    selectCategorie.appendChild(option);
                });
            })
            .catch(error => console.error('Erreur lors du chargement des catégories:', error));
    }

    // Création de l'en-tête de la modale avec gestion des boutons de fermeture et de retour
    function createModalHeader(includeGoPrev = false) {
        const header = document.createElement('div');
        header.className = 'header-modal';
        header.innerHTML = `${includeGoPrev ? '<button class="goPrev">[<]</button>' : ''}<button class="close">X</button>`;

        // Ajout d'écouteurs pour les boutons de fermeture et de retour
        const closeBtn = header.querySelector('.close');
        closeBtn.addEventListener('click', closeModal);
        if (includeGoPrev) {
            const goPrevBtn = header.querySelector('.goPrev');
            goPrevBtn.addEventListener('click', () => displayModal(1));
        }

        return header;
    }
});
