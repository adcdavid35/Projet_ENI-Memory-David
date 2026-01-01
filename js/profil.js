//select choix de jeu
const select = document.getElementById("choix");
const data = [
  { value: "", label: "Choississez votre thème :", disabled: true },
  { value: "Chiens", label: "Chiens" },
  { value: "Dino", label: "Dinosaures" },
  { value: "Ferme", label: "Aminaux de la ferme" },
  { value: "Savane", label: "Animaux de la savane" },
];

data.forEach((item) => {
  const option = document.createElement("option");
  option.value = item.value;
  option.textContent = item.label;

  if (item.disabled) {
    option.disabled = true;
    option.selected = true; // option par défaut
  }
  select.appendChild(option);
});

// select taille du plateau
const select2 = document.getElementById("Taille");
const data2 = [
  { value: "", label: "Choississez votre plateau :", disabled: true },
  { value: "12", label: "4 X 3" },
  { value: "16", label: "4 X 4" },
  { value: "20", label: "5 X 4" },
  { value: "30", label: "6 X 5" },
  { value: "36", label: "6 X 6" },
  { value: "40", label: "8 X 5" },
];

data2.forEach((item) => {
  const option = document.createElement("option");
  option.value = item.value;
  option.textContent = item.label;

  if (item.disabled) {
    option.disabled = true;
    option.selected = true; // option par défaut
  }
  select2.appendChild(option);
});

// bouton enregistrement des options
document.getElementById("xxx")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  let memory = document.getElementById("choix").value;
  let taille = document.getElementById("Taille").value;
  let currentUsers = JSON.parse(localStorage.getItem("currentUsers"));
  let users = JSON.parse(localStorage.getItem("users")) || {};
  let email = currentUsers.email;

  if (!currentUsers) return;
  if (!users[email]) {
    alert("Utilisateur non trouvé !");
    return;
  }

  users[email].preference = { memory, taille };
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUsers", JSON.stringify({ email }));

  saveConfig();
  window.location.href = "play.html";
});

// affichage du profil connecté dans les inputs
function Profil() {
  let users = JSON.parse(localStorage.getItem("users"));
  let currentUsers = JSON.parse(localStorage.getItem("currentUsers"));

  if (!currentUsers) return;

  const email = currentUsers.email;
  const user = users[email];

  document.getElementById("nom").value = user.nom;
  document.getElementById("mail").value = email;
}

// modification des images en fonction du choix dans le select
document.getElementById("choix").addEventListener("change", () => {
  document.getElementById("global").src = "Images/" + document.getElementById("choix").value + "/global.png";
  document.getElementById("body").style.backgroundImage = "url('../Images/Fonddecran/" + document.getElementById("choix").value + ".png')";
});

// bouton supprimer compte
document.getElementById("reset").addEventListener("click", function (e) {
  e.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || {};
  let currentUserEmail = JSON.parse(localStorage.getItem("currentUsers"))?.email;

  if (!currentUserEmail || !users[currentUserEmail]) {
    alert("Utilisateur non trouvé !");
    return;
  }
  delete users[currentUserEmail];
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("currentUsers");

  alert("Votre compte a été supprimé !");

  document.getElementById("nom").value = "";
  document.getElementById("mail").value = "";
  window.location.href = "inscription.html";
});

function saveConfig() {
  configJeu.fond = select.value;
  configJeu.label = select.selectedOptions[0].textContent;
  configJeu.grille = select2.selectedOptions[0].textContent;
  localStorage.setItem("config", JSON.stringify(configJeu));
}

function showScorePlayer() {
  let users = JSON.parse(localStorage.getItem("users")) || {};
  let currentUsers = JSON.parse(localStorage.getItem("currentUsers"));
  let email = currentUsers.email;
  // génère le plateau de jeu en fonction des préférences
  // récupère <table> et <tbody>
  const tblBody = document.getElementById("bestPlayer");

  // création de toutes les cellules
  if (users[email].score.length != 0) {
    for (let i = 0; i < users[email].score.length; i++) {
      // crée une ligne de tableau
      const ligne3 = document.createElement("tr");
      ligne3.className = "cell";
      // Crée un élément <td>
      let cellScore = document.createElement("td");
      cellScore.className = "cellTD";
      cellScore.textContent = users[email].score[i].score;
      ligne3.appendChild(cellScore);

      let cellGrille = document.createElement("td");
      cellGrille.className = "cellTD";
      cellGrille.textContent = users[email].score[i].plateau;
      ligne3.appendChild(cellGrille);

      let cellGame = document.createElement("td");
      cellGame.className = "cellTD";
      cellGame.textContent = users[email].score[i].jeu;
      ligne3.appendChild(cellGame);

      let cellDate = document.createElement("td");
      cellDate.className = "cellTD";
      cellDate.textContent = users[email].score[i].date;
      ligne3.appendChild(cellDate);
      // ajoute la ligne à la fin du corps du tableau
      tblBody.appendChild(ligne3);
    }
  }
}

function majScorePlayer() {
  let users = JSON.parse(localStorage.getItem("users")) || {};
  let currentUsers = JSON.parse(localStorage.getItem("currentUsers"));
  let email = currentUsers.email;

  users[email].score.sort((a, b) => {
    // tri par plateau
    if (a.plateau !== b.plateau) {
      return a.plateau.localeCompare(b.plateau);
    }

    // si même plateau : tri par score
    return a.score - b.score;
  });

  //scores[plat] = users[email].score.slice(0, 5);
  localStorage.setItem("users", JSON.stringify(users));
}

Profil();
majScorePlayer();
showScorePlayer();
