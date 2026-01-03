// Partie authentification sur inscription.HTML
document.getElementById("formIns")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  let nom = document.getElementById("nom").value;
  let email = document.getElementById("mail").value;
  let password = document.getElementById("MDP").value;
  let users = JSON.parse(localStorage.getItem("users")) || {};
  let scores = JSON.parse(localStorage.getItem("scores")) || {};

  const pseudoExiste = Object.values(users).some((user) => user.nom === nom);
  if (pseudoExiste) {
    alert("Pseudo déjà utilisé");
    return;
  }

  const pseudoExiste2 = Object.values(scores)
    .flat()
    .some((score) => score.player === nom);
  if (pseudoExiste2) {
    alert("Pseudo déjà utilisé");
    return;
  }

  if (users[email]) {
    alert("Cet email existe déjà!");
    return;
  }

  users[email] = {
    nom: nom,
    password: password,
    score: {
      plateau12: [],
      plateau16: [],
      plateau20: [],
      plateau30: [],
      plateau36: [],
      plateau40: [],
    },

    preference: {},
  };

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUsers", JSON.stringify({ email: email }));

  alert("Vous êtes inscrit!");

  window.location.href = "connexion.html";
});

// Partie connexion sur connexion.HTML

document.getElementById("formConnect")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  let email = document.getElementById("mail").value;
  let password = document.getElementById("MDP").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[email]) {
    if (password === users[email].password) {
      alert("Vous êtes connecté!");
      localStorage.setItem("currentUsers", JSON.stringify({ email: email }));
      window.location.href = "profil.html";
      // initialisation du profil selon le joueur
    } else {
      alert("Le mot de passe n'est pas bon!");
      document.getElementById("MDP").value = "";
      return;
    }
  } else {
    alert("Cet email n'existe pas!");
    document.getElementById("mail").value = "";
    document.getElementById("MDP").value = "";

    return;
  }
});

document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("formCon").reset();
});
