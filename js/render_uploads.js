const imageExtenstions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtenstions = ["mp4", "mkv", "webm", "mov", "avi"];
const audioExtenstions = ["mp3", "wav", "ogg"];

function createMediaElement(url) {
  const extension = url.split(".").pop();

  const div = document.createElement("div");
/*
  const imageText = document.createElement("div");
  imageText.classList.add("desc")
  imageText.textContent = description;

 */

  if (imageExtenstions.includes(extension)) {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Image";
    div.appendChild(img);
    console.log(div)
  } else if (videoExtenstions.includes(extension)) {
    const video = document.createElement("video");
    video.width = 320;
    video.height = 240;
    video.controls = true;
    const source = document.createElement("source");
    source.src = url;
    source.type = "video/mp4";
    video.appendChild(source);
    div.appendChild(video);
  } else if (audioExtenstions.includes(extension)) {
    const audio = document.createElement("audio");
    audio.controls = true;
    const source = document.createElement("source");
    source.src = url;
    source.type = "audio/mpeg";
    audio.appendChild(source);
    div.appendChild(audio);
  }

  return div;
}

async function loadMedias() {
  const medias = await fetch(`${API_BASE}/media/all`, {
    method: "GET",
    mode: "cors"
  });

  const mediaContainer = document.getElementById("media-container");
  if (!medias.ok) {
    mediaContainer.textContent = "Error";
    return;
  }

  for ( const media of await medias.json() ) {
    const imageText = document.createElement("div");
    imageText.classList.add("desc")
    imageText.textContent = media.description

    const fullImage = document.createElement("a");
    fullImage.href = `${API_BASE}/media/upload/${encodeURIComponent(media.filePath)}`

    const gallery = document.createElement("div");
    gallery.classList.add("gallery")

    const newElement = createMediaElement(`${API_BASE}/media/upload/${encodeURIComponent(media.filePath)}`);

    mediaContainer.appendChild(gallery)
    gallery.appendChild(fullImage);
    fullImage.appendChild(newElement)
    gallery.appendChild(imageText)
    //mediaContainer.appendChild(newElement);
  }
}

document.addEventListener("DOMContentLoaded", async function() {
  await loadMedias();
});