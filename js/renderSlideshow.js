async function loadSlideshow() {
  const slideshowContainer = document.querySelector('.intro-slideshow');

  try {
    const response = await fetch(`${API_BASE}/slideshow/all`, {
      method: "GET",
      mode: "cors"
    });

    if (!response.ok) {
      throw new Error(`Error fetching image URLs: ${response.statusText}`);
    }

    const imageUrls = await response.json();
    console.log(imageUrls);

    // Clear existing content in the slideshow container
    slideshowContainer.innerHTML = '';

    // Create an image element for each URL
    imageUrls.forEach(url => {
      console.log(url);
      const img = document.createElement('img');
      img.src = `${API_BASE}/slideshow/uploadSlideshow/${encodeURIComponent(url.filePath)}`;
      img.alt = 'Slideshow Image';
      img.style.width = "40%";
      img.style.
      console.log('Image source:', img.src);
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

  // Check if there are images to display
  if (slideshowImages.length === 0) {
    console.warn("No images found for the slideshow.");
    return;
  }

  // Hide all images except the first one
  slideshowImages.forEach((img, index) => {
    img.style.opacity = index === 0 ? 1 : 0;
  });

  setInterval(nextImage, nextImageDelay);

  function nextImage() {
    slideshowImages[currentImageCounter].style.opacity = 0;
    currentImageCounter = (currentImageCounter + 1) % slideshowImages.length;
    slideshowImages[currentImageCounter].style.opacity = 1;
  }
}

document.addEventListener("DOMContentLoaded", loadSlideshow);