document.addEventListener("DOMContentLoaded", function () {
  var updatedAboutUsContent = localStorage.getItem("updatedAboutUsContent");

  if (updatedAboutUsContent) {
    var aboutUsElement = document.getElementById("aboutSectionContent");
    if (aboutUsElement) {
      aboutUsElement.innerHTML = updatedAboutUsContent;
    }

    localStorage.removeItem("updatedAboutUsSection");
  }
})