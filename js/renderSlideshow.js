async function loadSlideshow() {
  const slideshowContainer = document.querySelector('.intro-slideshow');

  try {
    const imageUrls = await fetch(`${API_BASE}/slideshow/all`, {
      method: "GET",
      mode: "cors"
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching image URLs:', error);
        return [];
      });

    // Create an image element for each URL
    imageUrls.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Slideshow Image';
      slideshowContainer.appendChild(img);
    });

    // Start the slideshow
    nextImage()
  } catch (error) {
    console.error('Error loading slideshow:', error);
  }
}

document.addEventListener("DOMContentLoaded", loadSlideshow);
