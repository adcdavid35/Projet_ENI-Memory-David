//variables
let configJeu = JSON.parse(localStorage.getItem("config")) || {};
let fond = configJeu.fond;
let label = configJeu.label;
let grille = configJeu.grille;

let currentUserEmail = JSON.parse(localStorage.getItem("currentUsers"))?.email;

// bouton deconnexion
document.getElementById("deconnect").addEventListener("click", function (e) {
  e.preventDefault();
  let currentUserEmail = JSON.parse(localStorage.getItem("currentUsers"))?.email;
  if (!currentUserEmail) {
    alert("Aucun utilisateur n'est connecté!");
    return;
  }

  // suppression du profil courant dans le LocalStorage
  //delete currentUserEmail[currentUserEmail];

  localStorage.removeItem("currentUsers");
  // RAZ des préférences de jeu dans le LocalStorage
  let configJeu = JSON.parse(localStorage.getItem("config")) || {};
  configJeu.fond = "";
  configJeu.label = "";
  configJeu.grille = "";
  localStorage.setItem("config", JSON.stringify(configJeu));
  alert("Vous êtes déconnecté!");
  // redirection vers la page de profil pour RAZ des input
  window.location.href = "profil.html";
  document.getElementById("nom").value = "";
  document.getElementById("mail").value = "";
  // redirection vers la page de connenxion
  window.location.href = "connexion.html";
});

//changement des images de fond et de présentation du jeu(index)
if (fond) {
  document.getElementById("body").style.backgroundImage = "url('images/fonddecran/" + fond.toLowerCase() + ".png')";
  if (document.getElementById("global")) {
    document.getElementById("global").src = "images/" + fond.toLowerCase() + "/global.png";
  }
}

//changement de thème dans l'ensemble du projet (ou memory.js est appelé)
function changeStyle() {
  // retirer toutes les classes de thème
  document.body.classList.remove("chiens", "dino", "ferme", "savane");

  // ajouter la bonne classe
  document.body.classList.add(fond.toLowerCase());
}
changeStyle();

// fonction qui sert à récupérer le type de plateau pour gestion des scores dans le localStorage
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
