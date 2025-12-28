let fond = localStorage.getItem("fond");
if (fond) {
  document.getElementById("body").style.backgroundImage = "url('../Images/Fonddecran/" + fond + ".png')";
}

function init() {
  document.getElementById("nom").addEventListener("input", (e) => {
    if (e.target.value.length < 3) {
      document.getElementById("pseudo").style.color = "red";
      document.getElementById("valide1").src = "./Images/error.svg";
    } else {
      document.getElementById("pseudo").style.color = "black";
      document.getElementById("valide1").src = "./Images/check.svg";
    }
  });

  function validateEmail(courriel) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(courriel);
  }
  document.getElementById("mail").addEventListener("input", (e) => {
    if (!validateEmail(e.target.value)) {
      document.getElementById("mail1").style.color = "red";
      document.getElementById("valide2").src = "./Images/error.svg";
    } else {
      document.getElementById("mail1").style.color = "black";
      document.getElementById("valide2").src = "./Images/check.svg";
    }
  });

  function validatePassword(PW) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
    return passwordRegex.test(PW);
  }

  let val = "";
  let val2 = "";
  document.getElementById("MDP").addEventListener("input", (e) => {
    val = e.target.value;
    if (!validatePassword(val)) {
      document.getElementById("regex").style.color = "red";
      document.getElementById("valide3").src = "./Images/error.svg";
      verifMDP();
    } else if (val.length < 6) {
      document.getElementById("fai").style.visibility = "visible";
      document.getElementById("faible").style.visibility = "visible";
      document.getElementById("moy").style.visibility = "hidden";
      document.getElementById("moyen").style.visibility = "hidden";
      document.getElementById("for").style.visibility = "hidden";
      document.getElementById("fort").style.visibility = "hidden";
      document.getElementById("regex").style.color = "black";
      document.getElementById("valide3").src = "./Images/check.svg";
      verifMDP();
    } else if (val.length >= 6 && val.length < 9) {
      document.getElementById("fai").style.visibility = "hidden";
      document.getElementById("faible").style.visibility = "hidden";
      document.getElementById("moy").style.visibility = "visible";
      document.getElementById("moyen").style.visibility = "visible";
      document.getElementById("for").style.visibility = "hidden";
      document.getElementById("fort").style.visibility = "hidden";
      document.getElementById("regex").style.color = "black";
      document.getElementById("valide3").src = "./Images/check.svg";
      verifMDP();
    } else {
      document.getElementById("fai").style.visibility = "hidden";
      document.getElementById("faible").style.visibility = "hidden";
      document.getElementById("moy").style.visibility = "hidden";
      document.getElementById("moyen").style.visibility = "hidden";
      document.getElementById("for").style.visibility = "visible";
      document.getElementById("fort").style.visibility = "visible";
      document.getElementById("regex").style.color = "black";
      document.getElementById("valide3").src = "./Images/check.svg";
      verifMDP();
    }
  });
  document.getElementById("MDP2").addEventListener("input", (f) => {
    val2 = f.target.value;
    verifMDP();
  });

  function verifMDP() {
    if (val === "" || val2 === "") return;
    if (val === val2) {
      document.getElementById("valide4").src = "./Images/check.svg";
      document.getElementById("egal").innerHTML = "Il est identique.";
      document.getElementById("egal").style.color = "green";
    } else {
      document.getElementById("valide4").src = "./Images/error.svg";
      document.getElementById("egal").innerHTML = "Il n'est pas identique.";
      document.getElementById("egal").style.color = "red";
    }
  }

  document.getElementById("reset").addEventListener("click", () => {
    document.getElementById("formIns").reset();
  });
}
