window.onload = init;
let plat = findPlateau(grille);
let scores = {
  plateau12: [{}],
  plateau16: [{}],
  plateau20: [{}],
  plateau30: [{}],
  plateau36: [{}],
  plateau40: [{}],
};

if (!localStorage.getItem("scores")) {
  localStorage.setItem("scores", JSON.stringify(scores));
}

// affiche le titre du jeu
if (fond) {
  document.getElementById("caption").innerText = "Les " + label.toLowerCase() + " :";
}

let col = parseInt(grille.split(" X ")[0]);
let row = parseInt(grille.split(" X ")[1]);
let myImage = new Image();
myImage.src = "./images/question.svg";
myImage.className = "size";

// génère le plateau de jeu en fonction des préférences
function generateTable() {
  const tblBody = document.getElementById("grille");

  for (let i = 0; i < row; i++) {
    const ligne = document.createElement("tr");

    for (let j = 0; j < col; j++) {
      let cell = document.createElement("td");
      cell.className = "image";
      let img = myImage.cloneNode(true);
      cell.appendChild(img);
      ligne.appendChild(cell);
    }

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
  let facecachee = "./images/question.svg";
  let cardSelect = document.querySelectorAll(".image");

  let current = JSON.parse(localStorage.getItem("currentUsers"));
  let users = JSON.parse(localStorage.getItem("users"));

  let email = current?.email;
  let memory = users?.[email]?.preference?.memory;

  if (!current) {
    alert("Veuillez vous connecter!");
    window.location.href = "connexion.html";
  }
  cardSelect.forEach((element) => {
    element.dataset.disabled = "false";
    element.addEventListener("click", returnCard);
  });

  // pour borner le début de numérotation des cartes entre 1 et 20.
  function getRandomInt(max) {
    min = 1;
    max = Math.floor(max);
    let nombre = Math.floor(Math.random() * (max - min + 1)) + min - nbreCarteDiff;
    if (nombre < 1) return 1;
    return nombre;
  }

  // Je fais un tableau de paires, je le mélange
  let nbreCarteDiff = users?.[email]?.preference?.taille / 2;

  let start = getRandomInt(20);

  for (let i = start; i <= start + nbreCarteDiff - 1; i++) {
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

      majScore(users[email].nom, compteur, memory);

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
    img.src = "./images/" + memory + "/" + tableauImage.get(card) + ".png";

    coups.push(tableauImage.get(card));
    cartesCliquees.push(card);

    if (coups.length === 2) {
      compteur++;
      compteurFinal.textContent = compteur;

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
}

function majScore(nom, compteur, memory) {
  //partie pour page :profil
  let users = JSON.parse(localStorage.getItem("users")) || {};
  let currentUsers = JSON.parse(localStorage.getItem("currentUsers"));
  let email = currentUsers.email;
  if (!users[email].score[plat]) {
    users[email].score[plat] = [];
  }

  users[email].score[plat].push({
    score: compteur,
    plateau: grille,
    jeu: memory,
    date: new Date().toLocaleDateString("fr-FR"),
  });

  users[email].score[plat].sort((a, b) => a.score - b.score);

  users[email].score[plat] = users[email].score[plat].slice(0, 5);

  localStorage.setItem("users", JSON.stringify(users));

  //partie pour page :jouer
  let scores = JSON.parse(localStorage.getItem("scores"));

  scores[plat].push({ player: nom, score: compteur, jeu: memory, date: new Date().toLocaleDateString("fr-FR") });

  scores[plat].sort((a, b) => a.score - b.score);

  scores[plat] = scores[plat].slice(0, 3);
  localStorage.setItem("scores", JSON.stringify(scores));
}

function showScore() {
  let scores = JSON.parse(localStorage.getItem("scores"));

  // génère le tableau de score en fonction de la grandeur de la grille
  const tblBody = document.getElementById("best");

  if (scores[plat].length != 0) {
    for (let i = 0; i < scores[plat].length; i++) {
      const ligne2 = document.createElement("tr");
      ligne2.className = "cell";

      let cellPlayer = document.createElement("td");
      cellPlayer.className = "cellTD";
      cellPlayer.textContent = scores[plat][i].player;
      ligne2.appendChild(cellPlayer);

      let cellScore = document.createElement("td");
      cellScore.className = "cellTD";
      cellScore.textContent = scores[plat][i].score;
      ligne2.appendChild(cellScore);

      let cellGame = document.createElement("td");
      cellGame.className = "cellTD";
      cellGame.textContent = scores[plat][i].jeu;
      ligne2.appendChild(cellGame);

      let cellDate = document.createElement("td");
      cellDate.className = "cellTD";
      cellDate.textContent = scores[plat][i].date;
      ligne2.appendChild(cellDate);

      tblBody.appendChild(ligne2);
    }
  }
}

showScore();
//clavier
document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    window.location.reload();
  }
});

//Smartphone
let tap = 0;

document.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "touch") {
    const now = Date.now();
    if (now - tap < 300) {
      window.location.reload();
    }
    tap = now;
  }
});

function relanceJeu() {
  if (
    window.matchMedia("(orientation: landscape)") &&
    window.matchMedia("screen and (max-width: 970px)").matches &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    document.getElementById("smartphone").textContent = "Double cliquez pour pour relancer le jeu.";
  } else {
    document.getElementById("smartphone").textContent = "Appuyez sur la barre d'espace pour relancer le jeu.";
  }
}

window.addEventListener("resize", relanceJeu);
