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

function createStep3Modal() {
    let imageSrc = true; // Initialisez imageSrc à null
    const header = createModalHeader(true);
    const form = document.createElement('form');
    form.className = 'form-content';
    form.setAttribute('enctype', 'multipart/form-data');

    // Créer le formulaire
    const photoUpload = document.createElement('div');
    photoUpload.className = 'photo-upload image-preview';



    const titreFormGroup = document.createElement('div');
    titreFormGroup.className = 'form-group';
    const titreLabel = document.createElement('label');
    titreLabel.setAttribute('for', 'titreInput');

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



function createStep3Modal(imageSrc, title, categoryId) {
    const header = createModalHeader(true);
    const main = document.createElement('div');
    main.className = 'main-modal';

    // Créer le contenu sans utiliser innerHTML
    const previewImg = document.createElement('img');
    previewImg.src = imageSrc;
    previewImg.alt = 'Prévisualisation';
    previewImg.className = 'preview-img';

    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container';

    const infoTitle = document.createElement('p');
    infoTitle.textContent = `Titre: ${title}`;

    const infoCategorie = document.createElement('p');
    infoCategorie.textContent = `Catégorie ID: ${categoryId}`;

    infoContainer.appendChild(infoTitle);
    infoContainer.appendChild(infoCategorie);

    main.appendChild(previewImg);
    main.appendChild(infoContainer);

    const footer = document.createElement('div');
    footer.className = 'footer-modal';

    // **Ajout du bouton sans utiliser innerHTML:**
    const btnSubmitFinal = document.createElement('button');
    btnSubmitFinal.type = 'button';
    btnSubmitFinal.className = 'btn-submit';
    btnSubmitFinal.textContent = 'Envoyer définitivement';
    btnSubmitFinal.addEventListener('click', () => submitFinal(imageSrc, title, categoryId));

    footer.appendChild(btnSubmitFinal);

    // **Mettre à jour l'innerHTML de modalContent**
    modalContent.innerHTML = ''; // Nettoie le contenu précédent
    modalContent.appendChild(header);
    modalContent.appendChild(main);
    modalContent.appendChild(footer);

    return { header, main, footer };
}
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
    closeModal(); // Or display success message
    // Update gallery (implement logic to add new work to gallery)
    loadGallery(document.getElementById('Gallery')); 
})
.catch((error) => {
    console.error('Error:', error);
    // Ici, vous pouvez gérer l'erreur, par exemple en affichant un message d'erreur à l'utilisateur
});