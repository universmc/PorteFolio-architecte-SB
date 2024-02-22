// Chargement du DOM

document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");

const modalOverlay = document.getElementById('modalOverlay');
const openModalBtn = document.getElementById('open-modal-btn');
const modal = document.getElementById('modalContent');


// ouverture de la Modal 
openModalBtn.addEventListener('click', () => {
    modalOverlay.style.display = 'block'; // Affiche l'overlay
    displayModal(1); // Initialise et affiche la modale à l'Étape 1
  });
// fermeture de la Modal
  window.addEventListener('click', (event) => {
    if (event.target == modalOverlay) {
      modalOverlay.style.display = 'none'; // Cache l'overlay
      modal.style.display = 'none'; // Cache le contenu de la modale
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


// creation de la modal 2 
function createStep2Modal() {
    const header = document.createElement('div');
    header.className = 'header-modal';
    header.innerHTML = '<button class="goPrev">[<]</button><button class="close">X</button>';

    const form = document.createElement('form');
    form.className = 'form-content';
    form.setAttribute('enctype', 'multipart/form-data'); // Important pour l'envoi de fichiers
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
        <button type="submit" class="btn-submit">Envoyer</button>
    `;

    const main = document.createElement('div');
    main.className = 'main-modal';
    main.appendChild(form);

    const footer = document.createElement('div');
    footer.className = 'footer-modal';
    footer.innerHTML = '<div class="lnBar"></div>';


    return { header, main, footer };
}


// !!! ajouter la logique du formaire 

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


// gestionnaire d'evenement dans la modal 
function displayModal(step) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');

    // Nettoyer le contenu actuel de la modale
    modalContent.innerHTML = '';

    // Créer les éléments de la modale en fonction de l'étape
    
    let  content, header, main, footer;
    // Sélectionner le contenu en fonction de l'étape
    switch(step) {
        case 1:
            content = createStep1Modal();
            header = `<button class="close">X</button>`;
            main = `<h2>Galerie photo</h2><div class="modalGallery"></div>`;
            footer = `<div class="lnBar"></div><button id="btn-add-photo" class="btn-ajouter-photo">Ajouter une photo</button>`;
            
            break;
        case 2:
            content = createStep2Modal();
            header = `<button class="goPrev">[<]</button><button class="close">X</button>`;
            main = `
            <h2>Ajout photo</h2>
            <div class="form-content">
                <form>
                <div class="photo-upload image-preview">
                <img class="img-prev" src="img-preview.png" alt="Aperçu de l'image">
                <label for="addImgButton" class="add-img">+ Ajoutez photo</label>
                <input type="file" id="addImgButton" accept="image/png, image/jpeg" style="display: none;">
                <span class="format-img">jpg, .png 4mo max</span>
            </div>
                    <div class="form-group">
                        <label for="titre">Titre</label>
                        <input type="text" id="titre" name="titre"></div>
                    <div class="form-group">
                        <label for="categorie">Catégorie</label>
                        <select id="categorie" name="categorie">
                            <option value="">Sélectionnez une catégorie</option>
                        </select>
                    </div>
                </form>`;
            footer = `<div class="lnBar"></div>`;
            setupImageTitleAutoFill(); // Appeler la fonction pour configurer le remplissage automatique du titre
            chargerCategories(); 
            break;
        case 3:
            content = createStep3Modal();
            header = `<button class="goPrev">[<]</button><button class="close">X</button>`;
            main = `<h2>Ajout photo</h2><div class="form-content"><form><div class="photo-upload image-preview"><img class="img-prev" src="img-preview.png" alt="prev"><button class="add-img">+ Ajouter photo</button><span class="format-img">jpg, .png 4mo max></span></div><div class="form-group"><label for="titre">Titre</label><input type="text" id="titre" name="titre"></div><div class="form-group"><label for="categorie">Catégorie</label><select id="categorie" name="categorie"><option value="">Sélectionnez une catégorie</option></select></div><div class="form-group"></div></form>`;
            footer = `<div class="lnBar"></div><button type="submit" class="btn-submit">Valider</button>`;
            break;
        default:
            console.error('Étape non reconnue');
            return;
    }

    // Ajouter le nouveau contenu à la modale
    modalContent.appendChild(content.header);
    modalContent.appendChild(content.main);
    modalContent.appendChild(content.footer);

    if (step !== 2) {
        // Ajouter le nouveau contenu à la modale pour les autres étapes
        modalContent.appendChild(content.header);
        modalContent.appendChild(content.main);
        modalContent.appendChild(content.footer);
    }
    // Afficher la modale
    modalOverlay.style.display = 'block';
    modal.style.display = 'block';

    // Attacher les gestionnaires d'événements spécifiques (par exemple, fermeture, retour, soumission de formulaire)
    attachEventHandlers(step);

}

function setupImageTitleAutoFill() {
    const inputImage = document.getElementById('addImgButton');
    const inputTitre = document.getElementById('titre');

    if (inputImage && inputTitre) {
        inputImage.addEventListener('change', function(event) {
            if (event.target.files.length > 0) {
                const fileName = event.target.files[0].name;
                // Extraire le nom du fichier sans l'extension pour l'utiliser comme titre
                const title = fileName.replace(/\.[^/.]+$/, "");
                inputTitre.value = title; // Mettre à jour le champ du titre avec le nom du fichier
            }
        });
    }
}

function attachEventHandlers(step) {
    // Fermeture de la modale
    document.body.addEventListener('click', function(event) {
        // Fermeture de la modale
        if (event.target.matches('.close')) {
            modalOverlay.style.display = 'none';
            modal.style.display = 'none';
        }
    
        // Retour à l'étape précédente
        if (event.target.matches('.goPrev')) {
            displayModal(step - 1); // Assurez-vous que 'step' est correctement géré
        }
    
        // Passage à l'étape 2
        if (event.target.matches('#btn-add-photo')) {
            displayModal(2);
        }
    
        // Suppression d'un travail
        if (event.target.matches('.delete-icon')) {
            const id = event.target.getAttribute('data-id'); // Récupère l'ID de l'élément à supprimer
            if (id) {
                supprimerTravail(id);
            }
        }
        // Gestion de la soumission du formulaire dans la Modal 2
        if (step === 2) {
            const form = document.querySelector('.form-content');
            if (form) {
                form.addEventListener('submit', function(event) {
                    event.preventDefault(); // Empêche la soumission standard du formulaire
                    event.stopPropagation(); // Empêche la propagation de l'événement
        
                    const formData = new FormData(form);
                    const token = localStorage.getItem('token'); // Assurez-vous d'avoir le token
        
                    fetch('http://localhost:5678/api/works', {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                        displayModal(3); // Passez à la Modal 3 pour confirmer l'ajout
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                });
            }
        }
        

        
        // Ajoutez d'autres conditions si nécessaire
        
    });
    


    // Ajouter d'autres gestionnaires d'événements spécifiques à chaque étape ici

}
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
document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('submit', function(event) {
        if (event.target.matches('.form-content')) {
            event.preventDefault(); // Empêche la soumission standard du formulaire

            const formData = new FormData(event.target);
            const token = localStorage.getItem('token'); // Assurez-vous d'avoir le token

            fetch('http://localhost:5678/api/works', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                displayModal(3); // Passez à la Modal 3 pour confirmer l'ajout
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    });
});




function chargerCategories() {
    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(categories => {
            const selectCategorie = document.getElementById('categorie');
            selectCategorie.innerHTML = '<option value="">Sélectionnez une catégorie</option>'; // Réinitialise le contenu

            categories.forEach(categorie => {
                const option = document.createElement('option');
                option.value = categorie.id; // Supposons que chaque catégorie a un 'id'
                option.textContent = categorie.nom; // Supposons que chaque catégorie a un 'nom'
                selectCategorie.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des catégories:', error));
}

function attachEventHandlersForCurrentStep(step) {
    if (step === 2) {
        // Attache un gestionnaire d'événements pour 'goPrev' dans l'Étape 2
        const goPrevButton = modalContent.querySelector('.goPrev');
        if (goPrevButton) {
            goPrevButton.addEventListener('click', () => {
                displayModal(1); // Reviens à l'Étape 1
            });
        }

        // Charge les catégories chaque fois que la Modal 2 est affichée
        chargerCategories();
    }
    // Ajoute d'autres gestionnaires d'événements pour d'autres étapes si nécessaire
}

document.body.addEventListener('submit', function(event) {
    if (event.target.matches('.form-content')) {
        event.preventDefault(); // Empêche la soumission standard du formulaire
        event.stopPropagation(); // Empêche la propagation de l'événement

        const formData = new FormData(event.target);
        const token = localStorage.getItem('token'); // Assurez-vous d'avoir le token

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
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
            displayModal(3); // Passez à la Modal 3 pour confirmer l'ajout
        })
        .catch((error) => {
            console.error('Error:', error);
            // Ici, vous pouvez gérer l'erreur, par exemple en affichant un message d'erreur à l'utilisateur
        });
    }
});


// Appeler chargerCategories() après que la Modal 2 est affichée

modalContent.innerHTML = ''; // Nettoie le contenu précédent


