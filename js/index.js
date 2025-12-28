let fond = localStorage.getItem("fond");
if (fond) {
  document.getElementById("global").src = "Images/" + fond + "/global.png";
  document.getElementById("body").style.backgroundImage = "url('../Images/Fonddecran/" + fond + ".png')";
}
