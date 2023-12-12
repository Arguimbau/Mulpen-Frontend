// updateAboutUs

function updateAboutUs() {
  var aboutUsInput = document.getElementById("aboutUsInput").value;

  localStorage.setItem("updatedAboutUsContent", aboutUsInput);
  window.location.href = "about.html"
}