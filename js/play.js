window.onload = init;

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

  cardSelect.forEach((element) => {
    element.dataset.disabled = "false";
    element.addEventListener("click", returnCard);
  });
// Je fais un tableau de paires, je le mélange 
  for (let i = 1; i <= 6; i++) {
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

  // Je mélange mes cartes en fonction du tableau de paire
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
    let victoire = Array.from(testvictoire).every(
      (element) => element.dataset.disabled === "true"
    );

    if (victoire) {
      alert(
        "VICTOIRE ! Appuyez sur la touche ESPACE pour recommencer la partie"
      );
    }
  }
// Mécanique de jeu
  function returnCard(event) {
    let card = event.currentTarget;

    if (card.dataset.disabled === "true") return;

    if (cartesCliquees.length === 2) return;

    let img = card.querySelector("img");

    img.src = "./Images/Chiens/" + tableauImage.get(card) + ".webp";

    coups.push(tableauImage.get(card));
    cartesCliquees.push(card);

    if (coups.length === 2) {
      compteur++;
      compteurFinal.innerHTML = compteur;

      if (coups[0] === coups[1]) {
        disableCard(cartesCliquees[0]);
        disableCard(cartesCliquees[1]);

        coups = [];
        cartesCliquees = [];

        checkVictory();
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
