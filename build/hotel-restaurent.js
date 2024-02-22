// hotel-restaurent.js
document.addEventListener('DOMContentLoaded', () => {
    const modaleHotelRestaurants = document.getElementById('modale-hotel-restaurants');
    const btnCloseModale = document.querySelector('.close-modale');
    const galleryContainer = document.querySelector('.gallery-container');

    // Fonction pour charger et afficher les hôtels et restaurants
    function loadAndDisplayHotelRestaurants() {
        fetch('http://localhost:5678/api/works')
            .then(response => response.json())
            .then(works => {
                // Filtrer pour obtenir seulement les hôtels et restaurants
                const hotelRestaurants = works.filter(work => work.category.name === 'Hotels & restaurants');
                // Ajouter les hôtels et restaurants à la galerie
                hotelRestaurants.forEach(hotelRestaurant => {
                    const div = document.createElement('div');
                    div.innerHTML = `<img src="${hotelRestaurant.imageUrl}" alt="img-hotel-et-restaurant">`;
                    galleryContainer.appendChild(div);
                });
                // Afficher la modale
                modaleHotelRestaurants.style.display = 'block';
            })
            .catch(error => console.error('Erreur:', error));
    }

    // Événement pour fermer la modale
    btnCloseModale.addEventListener('click', () => {
        modaleHotelRestaurants.style.display = 'none';
    });

    // Initialisation
    loadAndDisplayHotelRestaurants();
});
