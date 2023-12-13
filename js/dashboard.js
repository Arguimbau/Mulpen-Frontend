// hello


document.getElementById("update").addEventListener("click", function() {
    window.location.href = "/updateAboutUs"
})

document.getElementById("logout").addEventListener("click", function () {
    localStorage.removeItem("authToken")
    window.location.href = "/"
});

document.getElementById("upload").addEventListener("click", function () {
    window.location.href = "/upload"
});

document.getElementById("delete-media").addEventListener("click", function() {
    window.location.href = "/deleteMedia"
})

document.getElementById("uploadSlideshow").addEventListener("click", function () {
    window.location.href = "/uploadSlideshow"
});

document.getElementById("deleteSlideshow").addEventListener("click", function () {
    window.location.href = "/deleteSlideshow"
});

document.getElementById("deleteUser").addEventListener("click", function () {
    window.location.href = "/deleteUser"
});

document.getElementById("createUser").addEventListener("click", function () {
    window.location.href = "/createUser"
});




