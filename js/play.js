window.onload = init;
let scores = {
  plateau12: [],
  plateau16: [],
  plateau20: [],
  plateau30: [],
  plateau36: [],
  plateau40: [],
};

if (!localStorage.getItem("scores")) {
  localStorage.setItem("scores", JSON.stringify(scores));
}

let configJeu = JSON.parse(localStorage.getItem("config")) || {};
let fond = configJeu.fond;
let label = configJeu.label;
let grille = configJeu.grille;

let col = parseInt(grille.split(" X ")[0]);
let row = parseInt(grille.split(" X ")[1]);
let myImage = new Image();
myImage.src = "./Images/question.svg";
myImage.className = "size";

// modifie le fond d'écran en fonction des préférences
if (fond) {
  document.getElementById("body").style.backgroundImage = "url('../Images/Fonddecran/" + fond + ".png')";
  document.getElementById("caption").innerText = "Les " + label.toLowerCase() + " :";
}

// génère le plateau de jeu en fonction des préférences
function generateTable() {
  // récupère <table> et <tbody>
  const tblBody = document.getElementById("grille");

  // création de toutes les cellules
  for (let i = 0; i < row; i++) {
    // crée une ligne de tableau
    const ligne = document.createElement("tr");

    for (let j = 0; j < col; j++) {
      // Crée un élément <td> et affecte l'image "?""
      let cell = document.createElement("td");
      cell.className = "image";
      let img = myImage.cloneNode(true);
      cell.appendChild(img);
      ligne.appendChild(cell);
    }

    // ajoute la ligne à la fin du corps du tableau
    tblBody.appendChild(ligne);
  }
}
generateTable();

function init() {
  let tableauImage = new Map();
  let valeurImages = [];
  let cartesCliquees = [];
  let coups = [];
  let compteurFinal = document.querySelector("compteur");
  let compteur = 0;
  let testvictoire = document.querySelectorAll(".image");
  let facecachee = "./Images/question.svg";
  let cardSelect = document.querySelectorAll(".image");

  let current = JSON.parse(localStorage.getItem("currentUsers"));
  let users = JSON.parse(localStorage.getItem("users"));

  let email = current?.email;
  let memory = users?.[email]?.preference?.memory;

  cardSelect.forEach((element) => {
    element.dataset.disabled = "false";
    element.addEventListener("click", returnCard);
  });

  // Je fais un tableau de paires, je le mélange
  let nbreCarteDiff = users?.[email]?.preference?.taille / 2;
  for (let i = 1; i <= nbreCarteDiff; i++) {
    valeurImages.push(i, i);
  }

  const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };

  let valeurImagesMelange = shuffle(valeurImages);

  // Je mélange mes cartes en fonction du tableau de paires
  melangeCards();

  function melangeCards() {
    cardSelect.forEach((card, i) => {
      tableauImage.set(card, valeurImagesMelange[i]);
    });
  }

  function disableCard(card) {
    card.dataset.disabled = "true";
    card.removeEventListener("click", returnCard);
  }

  function checkVictory() {
    let victoire = Array.from(testvictoire).every((element) => element.dataset.disabled === "true");

    if (victoire) {
      alert("VICTOIRE ! Appuyez sur la touche ESPACE pour recommencer la partie");

      let users = JSON.parse(localStorage.getItem("users")) || {};
      let currentUsers = JSON.parse(localStorage.getItem("currentUsers"));
      let email = currentUsers.email;
      users[email].score.push([compteur, grille, memory]);

      majScore(users[email].nom, compteur, grille, memory);

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUsers", JSON.stringify({ email }));
    }
  }
  // Mécanique de jeu
  function returnCard(event) {
    let card = event.currentTarget;

    if (card.dataset.disabled === "true") return;

    if (cartesCliquees.length === 2) return;

    let img = card.querySelector("img");

    // choix du jeu venant du profil
    img.src = "./Images/" + memory + "/" + tableauImage.get(card) + ".png";

    coups.push(tableauImage.get(card));
    cartesCliquees.push(card);

    if (coups.length === 2) {
      compteur++;
      compteurFinal.innerHTML = compteur;

      if (coups[0] === coups[1]) {
        setTimeout(() => {
          disableCard(cartesCliquees[0]);
          disableCard(cartesCliquees[1]);

          coups = [];
          cartesCliquees = [];
          checkVictory();
        }, 500);
      } else {
        setTimeout(() => {
          cartesCliquees[0].querySelector("img").src = facecachee;
          cartesCliquees[1].querySelector("img").src = facecachee;

          coups = [];
          cartesCliquees = [];
          checkVictory();
        }, 500);
      }
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      window.location.reload();
    }
  });
}

function majScore(nom, compteur, grille, memory) {
  let scores = JSON.parse(localStorage.getItem("scores"));
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

  scores[plateau].push({ player: nom, score: compteur, jeu: memory, date: new Date().toLocaleDateString("fr-FR") });

  scores[plateau].sort((a, b) => a.score - b.score);

  scores[plateau] = scores[plateau].slice(0, 3);
  localStorage.setItem("scores", JSON.stringify(scores));
}
