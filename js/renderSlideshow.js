async function loadSlideshow() {
  const slideshowContainer = document.querySelector('.intro-slideshow');

  try {
    const response = await fetch(`${API_BASE}/slideshow/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    });

    if (!response.ok) {
      throw new Error(`Error fetching image URLs: ${response.statusText}`);
    }

    const imageUrls = await response.json();
    console.log(imageUrls);

    // Create an image element for each URL
    imageUrls.forEach(url => {
      console.log(url);
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Slideshow Image';
      slideshowContainer.appendChild(img);
    });

    // Start the slideshow
    startSlideshow();
  } catch (error) {
    console.error('Error loading slideshow:', error);
  }
}

function startSlideshow() {
  const slideshowImages = document.querySelectorAll(".intro-slideshow img");
  const nextImageDelay = 4000;
  let currentImageCounter = 0;

  slideshowImages[currentImageCounter].style.opacity = 1;

  setInterval(nextImage, nextImageDelay);

  function nextImage() {
    slideshowImages[currentImageCounter].style.opacity = 0;
    currentImageCounter = (currentImageCounter + 1) % slideshowImages.length;
    slideshowImages[currentImageCounter].style.opacity = 1;
  }
}

document.addEventListener("DOMContentLoaded", loadSlideshow);