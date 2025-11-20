window.onload = init;

function init() {
  document.getElementById("nom").addEventListener("input", (e) => {
    if (e.target.value.length < 3) {
      let pseudo = (document.getElementById("pseudo").style.color = "red");
    } else {
      let pseudo = (document.getElementById("pseudo").style.color = "black");
    }
  });

  function validateEmail(courriel) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(courriel);
  }
  document.getElementById("mail").addEventListener("input", (e) => {
    if (!validateEmail(e.target.value)) {
      document.getElementById("mail1").style.color = "red";
    } else {
      document.getElementById("mail1").style.color = "black";
    }
  });

  function validatePassword(PW) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
    return passwordRegex.test(PW);
  }

  document.getElementById("MDP").addEventListener("input", (e) => {
    const val = e.target.value;
    if (!validatePassword(val)) {
      document.getElementById("regex").style.color = "red";
    } else if (val.length < 6) {
      document.getElementById("fai").style.visibility = "visible";
      document.getElementById("faible").style.visibility = "visible";
      document.getElementById("moy").style.visibility = "hidden";
      document.getElementById("moyen").style.visibility = "hidden";
      document.getElementById("for").style.visibility = "hidden";
      document.getElementById("fort").style.visibility = "hidden";
      document.getElementById("regex").style.color = "black";
    } else if (val.length >= 6 && val.length < 9) {
      document.getElementById("fai").style.visibility = "hidden";
      document.getElementById("faible").style.visibility = "hidden";
      document.getElementById("moy").style.visibility = "visible";
      document.getElementById("moyen").style.visibility = "visible";
      document.getElementById("for").style.visibility = "hidden";
      document.getElementById("fort").style.visibility = "hidden";
      document.getElementById("regex").style.color = "black";
    } else {
      document.getElementById("fai").style.visibility = "hidden";
      document.getElementById("faible").style.visibility = "hidden";
      document.getElementById("moy").style.visibility = "hidden";
      document.getElementById("moyen").style.visibility = "hidden";
      document.getElementById("for").style.visibility = "visible";
      document.getElementById("fort").style.visibility = "visible";
      document.getElementById("regex").style.color = "black";
    }
  });
}
