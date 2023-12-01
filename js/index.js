
    $(document).ready(function() {
    function redirectToPage(checkboxId, destinationUrl) {
        $('#' + checkboxId).change(function() {
            if ($(this).is(':checked')) {
                window.location.href = destinationUrl;
            }
        });
    }

    // Call the function for the first two checkboxes that redirect
    redirectToPage('Ja', 'contact.html');
    redirectToPage('VedIkke', 'viewVideo.html');

    // Function to change the description when "Naeh" is clicked
    function changeDescriptionOnNaeh() {
    $('#Naeh').change(function () {
    if ($(this).is(':checked')) {
    $('.description').text("For dårligt...");
} else {

    $('.description').text("Vi er et kreativt selsskab\n\lder udvikler og producerer\n\nunderholdning.\n\nEr vi ikke søde?\n\nTjo\nVed ikke\nNæh");
}
});
}

    // Call the function to set up the behavior
    changeDescriptionOnNaeh();
});


