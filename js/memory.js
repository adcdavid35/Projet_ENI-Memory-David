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

let configJeu = JSON.parse(localStorage.getItem("config")) || {};
let fond = configJeu.fond;
let label = configJeu.label;
let grille = configJeu.grille;

if (fond) {
  document.getElementById("body").style.backgroundImage = "url('../Images/Fonddecran/" + fond + ".png')";
  document.getElementById("global").src = "Images/" + fond + "/global.png";
}
