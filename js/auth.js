// Partie authentification sur inscription.HTML
document.getElementById("formIns")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  let nom = document.getElementById("nom").value;
  let email = document.getElementById("mail").value;
  let password = document.getElementById("MDP").value;
  let users = JSON.parse(localStorage.getItem("users")) || {};
  let scores = JSON.parse(localStorage.getItem("scores")) || {};

  // test de l'existance du pseudo dans les users du LocalStorage
  const pseudoExiste = Object.values(users).some((user) => user.nom === nom);
  if (pseudoExiste) {
    alert("Pseudo déjà utilisé");
    return;
  }

  // test de l'existance du pseudo dans les scores du LocalStorage pour ne pas confondre plusieurs users avec même pseudo
  const pseudoExiste2 = Object.values(scores)
    .flat()
    .some((score) => score.player === nom);
  if (pseudoExiste2) {
    alert("Pseudo déjà utilisé");
    return;
  }

  // test de l'existance de l'email pour ne pas qu'un user ait 2 profils
  if (users[email]) {
    alert("Cet email existe déjà!");
    return;
  }
  // initialisation du JSON du joueur
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
  //enregistrement du joueur dans le localStorage/users
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUsers", JSON.stringify({ email: email }));

  alert("Vous êtes inscrit!");
  // redirection vers la page de connexion
  window.location.href = "connexion.html";
});

// Partie connexion sur connexion.HTML
document.getElementById("formConnect")?.addEventListener("submit", async function (e) {
  e.preventDefault();

  let email = document.getElementById("mail").value;
  let password = document.getElementById("MDP").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};
  // correspondance email vs email enregistré
  if (users[email]) {
    if (password === users[email].password) {
      alert("Vous êtes connecté!");
      // iitialisation du joueur courant
      localStorage.setItem("currentUsers", JSON.stringify({ email: email }));
      // redirection vers la page de profil pour choix de préference de jeu
      window.location.href = "profil.html";
      // MDP incorrect
    } else {
      alert("Le mot de passe n'est pas bon!");
      document.getElementById("MDP").value = "";
      return;
    }
    // MDP inexistant
  } else {
    alert("Cet email n'existe pas!");
    document.getElementById("mail").value = "";
    document.getElementById("MDP").value = "";

    return;
  }
});

// Bouton "annuler" du formulaire
document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("formCon").reset();
});
