// language switch

function switchLanguage(language) {
  var productionLinkElement = document.getElementById("productionLink");
  var contactLinkElement = document.getElementById("contactLink");
  var aboutLinkElement = document.getElementById("aboutLink");
  var descriptionElement = document.getElementById("description");

  if (language === 'da') {
    productionLinkElement.innerHTML = '<h3>produktioner</h3>';
    contactLinkElement.innerHTML = '<h3>kontakt</h3>';
    aboutLinkElement.innerHTML = '<h3>om mulpen</h3>';

    descriptionElement.innerHTML = 'Vi er et kreativt selskab<br>der udvikler og producerer<br>' +
      'underholdning.<br><br>Er vi ikke søde?<br><br><label for="Ja">Tjo</label><input type="checkbox" ' +
      'id="Ja"><label for="VedIkke">Ved ikke</label><input type="checkbox" id="VedIkke">' +
      '<label for="Naeh">Næh</label><input type="checkbox" id="Naeh">';

  } else if (language === 'en') {
    productionLinkElement.innerHTML = '<h3>productions</h3>';
    contactLinkElement.innerHTML = '<h3>contact</h3>';
    aboutLinkElement.innerHTML = '<h3>about mulpen</h3>';

    descriptionElement.innerHTML = 'We are a creative company<br>developing and producing<br>' +
      'entertainment.<br><br>Aren\'t we sweet?<br><br><label for="Yeah">Sure</label><input type="checkbox" ' +
      'id="Yeah"><label for="NotSure">Not sure</label><input type="checkbox" id="NotSure">' +
      '<label for="Nah">Nah</label><input type="checkbox" id="Nah">';
  }
}

$(document).ready(function () {
  function redirectToPage(checkboxId, destinationUrl) {
    $('#' + checkboxId).change(function () {
      if ($(this).is(':checked')) {
        window.location.href = destinationUrl;
      }
    });
  }

  // Call the function for the first two checkboxes that redirect
  redirectToPage('Ja', '/contact');
  redirectToPage('VedIkke', '/videos');
  redirectToPage('Yeah', '/contact');
  redirectToPage('NotSure', '/videos');

  // Function to change the description when "Naeh" is clicked
  function changeDescriptionOnNaeh() {
    $('#Naeh').change(function () {
      if ($(this).is(':checked')) {
        $('.description').text("For dårligt...");
      } else {

        $('.description').text("Vi er et kreativt selskab\n\nder udvikler og producerer\n\nunderholdning.\n\nEr vi ikke søde?\n\nTjo\nVed ikke\nNæh");
      }
    });
  }

  function changeDescriptionOnNah() {
    $('#Nah').change(function () {
      if ($(this).is(':checked')) {
        $('.description').text("That sucks...");
      } else {
        $('.description').text("We are a creative company\ndeveloping and producing\nentertainment.\n\nAren\'t we sweet?\n\nSure\nNot Sure\nNah");
      }
    })
  }

  // Call the function to set up the behavior
  changeDescriptionOnNaeh();
  changeDescriptionOnNah();
});




