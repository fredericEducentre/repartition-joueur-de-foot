// Récupération des joueurs depuis le localStorage
function getPlayers() {
    return JSON.parse(localStorage.getItem('players')) || [];
}

// Sauvegarder les joueurs dans le localStorage
function savePlayers(players) {
    localStorage.setItem('players', JSON.stringify(players));
}

// Affichage de la liste des joueurs
function displayPlayers() {
    const players = getPlayers();
    const playersContainer = document.getElementById('playersContainer');
    playersContainer.innerHTML = '';

    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player';
        playerDiv.innerHTML = `
            <span><strong>${player.name}</strong> - Vitesse: ${player.speed}</span>
            <button onclick="editPlayer(${index})">Modifier</button>
            <button onclick="deletePlayer(${index})">Supprimer</button>
        `;
        playersContainer.appendChild(playerDiv);
    });
}

// Ajouter un joueur
document.getElementById('addPlayerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('playerName').value;
    const speed = parseInt(document.getElementById('playerSpeed').value);

    if (name && speed >= 0 && speed <= 100) {
        const players = getPlayers();
        players.push({ name, speed });
        savePlayers(players);
        displayPlayers();
        this.reset();
    } else {
        alert("Veuillez entrer un nom et une vitesse entre 0 et 100.");
    }
});

// Modifier un joueur
function editPlayer(index) {
    const players = getPlayers();
    const player = players[index];
    const newName = prompt("Modifier le nom du joueur:", player.name);
    const newSpeed = prompt("Modifier la vitesse du joueur:", player.speed);

    if (newName && newSpeed !== null && !isNaN(newSpeed) && newSpeed >= 0 && newSpeed <= 100) {
        players[index] = { name: newName, speed: parseInt(newSpeed) };
        savePlayers(players);
        displayPlayers();
    } else {
        alert("Nom et vitesse (entre 0 et 100) sont requis.");
    }
}

// Supprimer un joueur
function deletePlayer(index) {
    const players = getPlayers();
    players.splice(index, 1);
    savePlayers(players);
    displayPlayers();
}

// Afficher la liste des joueurs au chargement de la page
document.addEventListener('DOMContentLoaded', displayPlayers);

// Fonction pour répartir les joueurs en équipes équilibrées
function distributeTeams() {
    const players = getPlayers();
    
    // Vérifie s'il y a assez de joueurs pour au moins une équipe
    if (players.length < 11) {
        alert("Pas assez de joueurs pour former une équipe de 11.");
        return;
    }

    // Trier les joueurs par vitesse de manière décroissante pour équilibrer les équipes
    const sortedPlayers = [...players].sort((a, b) => b.speed - a.speed);

    // Initialiser les équipes
    const teams = [];
    let teamIndex = 0;

    // Répartir les joueurs dans les équipes
    while (sortedPlayers.length > 0) {
        // Si l'équipe n'existe pas encore, on la crée
        if (!teams[teamIndex]) teams[teamIndex] = [];

        // Ajouter un joueur à l'équipe actuelle
        teams[teamIndex].push(sortedPlayers.shift());

        // Passer à l'équipe suivante
        teamIndex = (teamIndex + 1) % Math.ceil(players.length / 11);
    }

    // Affichage des équipes
    displayTeams(teams);
}

// Fonction pour afficher les équipes
function displayTeams(teams) {
    const teamsContainer = document.getElementById('teamsContainer');
    teamsContainer.innerHTML = '';

    teams.forEach((team, index) => {
        const teamDiv = document.createElement('div');
        teamDiv.className = 'team';
        teamDiv.innerHTML = `<h3>Équipe ${index + 1}</h3>`;
        
        team.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player';
            playerDiv.innerText = `${player.name} - Vitesse: ${player.speed}`;
            teamDiv.appendChild(playerDiv);
        });

        teamsContainer.appendChild(teamDiv);
    });
}
