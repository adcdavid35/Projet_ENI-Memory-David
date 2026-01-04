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
let users = JSON.parse(localStorage.getItem("users"));
let currentUsers = JSON.parse(localStorage.getItem("currentUsers"));

const email = currentUsers.email;
const user = users[email];

let nom = user.nom;
let mail = user;

document.getElementById("choix").addEventListener("change", () => {
  document.getElementById("global").src = "Images/" + document.getElementById("choix").value + "/global.png";
  document.getElementById("body").style.backgroundImage = "url('../Images/Fonddecran/" + document.getElementById("choix").value + ".png')";

  if (document.getElementById("choix").value == "Chiens") {
    document.querySelectorAll(".Accueil, .Inscription, .Connexion, .Profil, .Jouer").forEach((el) => {
      el.style = "mix-blend-mode: screen";
    });

    document.querySelectorAll("h1, .Accueil, .Inscription, .Connexion, .Profil, .Jouer").forEach((el) => {
      el.style.color = "#b6e8f5ff";
    });

    document.querySelectorAll(".box, .formIns,.formCon ,.xxx  ").forEach((el) => {
      el.style.color = "#7bc4d7";
    });

    document.querySelectorAll(".foot,.fofo, .confirmPW, .footer span").forEach((el) => {
      el.style.color = "#00222b";
    });

    document.querySelectorAll(".mandatory").forEach((el) => {
      el.style.color = "#182a2eff";
    });
    if (nom) {
      document.getElementById("nom").style.color = "#68797d";
    }
    if (mail) {
      document.getElementById("mail").style.color = "#68797d";
    }
  }

  if (document.getElementById("choix").value == "Dino") {
    document.querySelectorAll(".Accueil, .Inscription, .Connexion, .Profil, .Jouer").forEach((el) => {
      el.style = "mix-blend-mode: screen";
    });

    document.querySelectorAll("h1, .Accueil, .Inscription, .Connexion, .Profil, .Jouer").forEach((el) => {
      el.style.color = "#c1f8d1ff";
    });

    document.querySelectorAll(".box, .formIns,.formCon ,.xxx  ").forEach((el) => {
      el.style.color = "#063620ff";
    });

    document.querySelectorAll(".foot,.fofo, .confirmPW, .footer span").forEach((el) => {
      el.style.color = "#021608ff";
    });

    document.querySelectorAll(".mandatory").forEach((el) => {
      el.style.color = "#063620ff";
    });
    if (nom) {
      document.getElementById("nom").style.color = "#2d3335ff";
    }
    if (mail) {
      document.getElementById("mail").style.color = "#2d3335ff";
    }
  }

  if (document.getElementById("choix").value == "Ferme") {
    document.querySelectorAll(".Accueil, .Inscription, .Connexion, .Profil, .Jouer").forEach((el) => {
      el.style = "mix-blend-mode: screen";
    });

    document.querySelectorAll("h1, .Accueil, .Inscription, .Connexion, .Profil, .Jouer").forEach((el) => {
      el.style.color = "#faecd2ff";
    });

    document.querySelectorAll(".box, .formIns,.formCon ,.confirmPW,.xxx  ").forEach((el) => {
      el.style.color = "#1f1304ff";
    });

    document.querySelectorAll(".foot, .fofo").forEach((el) => {
      el.style.color = "#F2EDE8";
    });

    document.querySelectorAll(".footer span").forEach((el) => {
      el.style.color = "black";
    });

    document.querySelectorAll(".mandatory").forEach((el) => {
      el.style.color = "wheat";
    });
    if (nom) {
      document.getElementById("nom").style.color = "#2d3335ff";
    }
    if (mail) {
      document.getElementById("mail").style.color = "#2d3335ff";
    }

    localStorage.setItem("users", JSON.stringify(users));
  }
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
  // génère le tableau de score en fonction du joueur connecté
  const tblBody = document.getElementById("bestPlayer");
  tblBody.innerHTML = "";

  Object.keys(users[email].score).forEach((plat) => {
    if (users[email].score[plat].length != 0) {
      const sepTab = document.createElement("tr");
      sepTab.className = "sepTab";

      for (let i = 0; i < users[email].score[plat].length; i++) {
        const ligne3 = document.createElement("tr");
        ligne3.className = "cell";

        let cellScore = document.createElement("td");
        cellScore.className = "cellTD";
        cellScore.textContent = users[email].score[plat][i].score;
        ligne3.appendChild(cellScore);

        let cellGrille = document.createElement("td");
        cellGrille.className = "cellTD";
        cellGrille.textContent = users[email].score[plat][i].plateau;
        ligne3.appendChild(cellGrille);

        let cellGame = document.createElement("td");
        cellGame.className = "cellTD";
        cellGame.textContent = users[email].score[plat][i].jeu;
        ligne3.appendChild(cellGame);

        let cellDate = document.createElement("td");
        cellDate.className = "cellTD";
        cellDate.textContent = users[email].score[plat][i].date;
        ligne3.appendChild(cellDate);

        tblBody.appendChild(ligne3);
      }
      tblBody.appendChild(sepTab);
    }
  });
}

Profil();

showScorePlayer();
