// bouton deconnexion
document.getElementById("deconnect").addEventListener("click", function (e) {
  e.preventDefault();

  let currentUserEmail = JSON.parse(localStorage.getItem("currentUsers"))?.email;

  if (!currentUserEmail) {
    alert("Aucun utilisateur n'est connecté!");
    return;
  }
  delete currentUserEmail[currentUserEmail];

  localStorage.removeItem("currentUsers");

  configJeu.fond = "";
  configJeu.label = "";
  configJeu.grille = "";

  alert("Vous êtes déconnecté!");
  window.location.href = "profil.html";
  document.getElementById("nom").value = "";
  document.getElementById("mail").value = "";
  window.location.href = "connexion.html";
});

//changement des images de fond et de présentation du jeu(index et profil)
let configJeu = JSON.parse(localStorage.getItem("config")) || {};
let fond = configJeu.fond;
let label = configJeu.label;
let grille = configJeu.grille;

let users = JSON.parse(localStorage.getItem("users"));
let currentUsers = JSON.parse(localStorage.getItem("currentUsers"));

const email = currentUsers.email;
const user = users[email];

let nom = user.nom;
let mail = user;

if (fond) {
  document.getElementById("body").style.backgroundImage = "url('../Images/Fonddecran/" + fond + ".png')";
  if (document.getElementById("global")) {
    document.getElementById("global").src = "Images/" + fond + "/global.png";
  }
}

if (fond == "Chiens") {
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

if (fond == "Dino") {
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

if (fond == "Ferme") {
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

function findPlateau(grille) {
  let plateau;
  switch (grille) {
    case "4 X 3":
      plateau = "plateau12";
      break;
    case "4 X 4":
      plateau = "plateau16";
      break;
    case "5 X 4":
      plateau = "plateau20";
      break;
    case "6 X 5":
      plateau = "plateau30";
      break;
    case "6 X 6":
      plateau = "plateau36";
      break;
    case "8 X 5":
      plateau = "plateau40";
      break;
  }
  return plateau;
}
