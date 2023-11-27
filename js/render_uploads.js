const imageExtenstions = ["jpg", "jpeg", "png", "gif", "webp"];
const videoExtenstions = ["mp4", "mkv", "webm", "mov", "avi"];
const audioExtenstions = ["mp3", "wav", "ogg"];

function createMediaElement(url, description) {
  const extension = url.split(".").pop();

  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.textContent = description;
  div.appendChild(h3);

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
    const gallery = document.createElement("div");
    gallery.className = "gallery";
    const newElement = createMediaElement(`${API_BASE}/media/upload/${encodeURIComponent(media.filePath)}`, media.description);
    mediaContainer.appendChild(newElement);


  }
}

document.addEventListener("DOMContentLoaded", async function() {
  await loadMedias();
});