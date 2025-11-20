window.onload = init;

function init() {
  let tableauImage = new Map();
  let valeurImages = [];
  let cartesCliquees = [];
  let coups = [];
  let compteurFinal = document.querySelector("compteur");
  let compteur = 0;
  let testvictoire = document.querySelectorAll(".image");

  let cardSelect = document.querySelectorAll(".image");
  cardSelect.forEach((element) => {
    element.addEventListener("click", returnCard);
  });

  for (let i = 1; i <= 6; i++) {
    valeurImages.push(i);
    valeurImages.push(i);
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
  melangeCards();
  console.log(valeurImagesMelange);
  function melangeCards() {
    cardSelect.forEach((img, i) => {
      tableauImage.set(img, valeurImagesMelange[i]);
    });
  }

  function returnCard(event) {
    let img = event.target;
    let facecachee = "./Images/question.svg";

    img.src =
      "./Images/Chiens/" + tableauImage.get(event.currentTarget) + ".webp";
    coups.push(tableauImage.get(event.currentTarget));
    cartesCliquees.push(event.currentTarget);
    console.log(coups);
    console.log(cartesCliquees);

    if (coups.length == 2) {
      if (coups[0] == coups[1]) {
        cartesCliquees[0].removeEventListener("click", returnCard);
        cartesCliquees[1].removeEventListener("click", returnCard);
        coups = [];
        cartesCliquees = [];
      } else {
        setTimeout(
          () => {
            cartesCliquees[0].querySelector("img").src = facecachee;
            cartesCliquees[1].querySelector("img").src = facecachee;
            coups = [];
            cartesCliquees = [];
          },

          500
        );
      }
      compteur++;
      compteurFinal.innerHTML = compteur;

      let victoire = Array.from(testvictoire).every((element) =>
        element.src.endsWith(facecachee)
      );
      testvictoire.forEach((element) => {
        if (!element.src.endsWith(facecachee)) {
          alert(
            "VICTOIRE! Appuyez sur le touche ESPACE pour recommencer la partie"
          );
        }
      });
    }
  }
  document.addEventListener("keydown", (event) => {
    //   console.log('Touche pressée:', event.key);
    if (event.key === "Space") {
      window.location.reload();
    }
  });
}
