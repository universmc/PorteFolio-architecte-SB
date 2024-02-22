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
