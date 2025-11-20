window.onload = Profil;

function Profil() {
  let users = JSON.parse(localStorage.getItem("users"));
  let currentUsers = JSON.parse(localStorage.getItem("currentUsers"));

  if (!currentUsers) return;

  const email = currentUsers.email;
  const user = users[email];

  document.getElementById("nom").value = user.nom;
  document.getElementById("mail").value = email;
}
