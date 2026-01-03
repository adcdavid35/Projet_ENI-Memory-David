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

  alert("Vous êtes déconnecté!");
  window.location.href = "profil.html";
  document.getElementById("nom").value = "";
  document.getElementById("mail").value = "";
  window.location.href = "connexion.html";
});

//changement des images de fond et de présentaion du jeu(index et profil)
let configJeu = JSON.parse(localStorage.getItem("config")) || {};
let fond = configJeu.fond;
let label = configJeu.label;
let grille = configJeu.grille;

if (fond) {
  document.getElementById("body").style.backgroundImage = "url('../Images/Fonddecran/" + fond + ".png')";
  document.getElementById("global").src = "Images/" + fond + "/global.png";
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
