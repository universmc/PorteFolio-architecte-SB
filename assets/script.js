fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Traitez les données ici
    })
    .catch(error => console.error('Erreur:', error));

// affichage de donnée 
fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(works => {
        const gallery = document.querySelector('.gallery');
        works.forEach(work => {
            const projectContent = document.createElement('div');
            projectContent.className = `projet${work.id}-content`;
            projectContent.innerHTML = `
                <div class="img${work.id}-content"><img src="${work.imageUrl}" alt="${work.title}"></div>
                <div class="titre-content"><h4>${work.title}</h4></div>
            `;
            gallery.appendChild(projectContent);
        });
    })
    .catch(error => console.error('Erreur:', error));

