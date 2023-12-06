document.addEventListener("DOMContentLoaded", async function () {
    // Get the slideshow container
    const slideshowContainer = document.querySelector('.intro-slideshow');

    // Fetch image URLs from the server
    const slideshow = await fetch(`${API_BASE}/slideshow/all`, {
        method: "GET",
        mode: "cors"
    })
      .then(response => response.json())
      .then(imageUrls => {
          // Create an image element for each URL
          imageUrls.forEach(url => {
              const img = document.createElement('img');
              img.src = url;
              img.alt = 'Slideshow Image';
              slideshowContainer.appendChild(img);
          });

          nextImage();
      })
      .catch(error => {
          console.error('Error fetching image URLs:', error);
      });
});