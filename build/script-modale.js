// Variables pour cibler les modales et les boutons
const modaleAll = document.getElementById('modale-all');
const modaleObjects = document.getElementById('modale-object');
const modaleAppartements = document.getElementById('modale-appartement');
const modaleHotelsRestaurants = document.getElementById('modale-hotel-resto');
const btnFermerModales = document.querySelectorAll('.close-modale');

let dataWorks = []; // Pour stocker les données des travaux

// Fonction pour afficher la modale en fonction de la catégorie sélectionnée
function displayModal(category) {
  // Cache toutes les modales
  modaleAll.style.display = 'none';
  modaleObjects.style.display = 'none';
  modaleAppartements.style.display = 'none';
  modaleHotelsRestaurants.style.display = 'none';

  // Affiche la modale correspondante
  if (category === 'all') {
    modaleAll.style.display = 'block';
  } else if (category === 'objects') {
    modaleObjects.style.display = 'block';
  } else if (category === 'appartements') {
    modaleAppartements.style.display = 'block';
  } else if (category === 'hotels-restaurants') {
    modaleHotelsRestaurants.style.display = 'block';
  }
}

// Récupération et affichage initial des données
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(works => {
    dataWorks = works;
    // Ici, vous pouvez appeler displayModal avec la catégorie souhaitée pour initialiser l'affichage
    displayModal('all');
  })
  .catch(error => console.error('Erreur:', error));

// Ajouter des événements pour fermer les modales
btnFermerModales.forEach(btn => {
  btn.addEventListener('click', () => {
    modaleAll.style.display = 'none';
    modaleObjects.style.display = 'none';
    modaleAppartements.style.display = 'none';
    modaleHotelsRestaurants.style.display = 'none';
  });
});

// Ajouter ici les autres événements pour les boutons de catégorie
