window.addEventListener("load", Profil);

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
});

function Profil() {
  let users = JSON.parse(localStorage.getItem("users"));
  let currentUsers = JSON.parse(localStorage.getItem("currentUsers"));

  if (!currentUsers) return;

  const email = currentUsers.email;
  const user = users[email];

  document.getElementById("nom").value = user.nom;
  document.getElementById("mail").value = email;
}
