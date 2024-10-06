document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".generate-form");
  const promptInput = document.querySelector(".prompt-input");
  const imageGallery = document.querySelector(".image-gallery");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = promptInput.value;
    const images = await fetchImages(query);

    if (images.length > 0) {
      displayImages(images);
    } else {
      alert("No images found!");
    }
  });

  async function fetchImages(query) {
    const accessKey = "7-0e8mTxCfJAGJQksytkQGLGxhxbZZQFTmIk9dfGHc0"; // Replace with your Unsplash API Access Key
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  }

  function displayImages(images) {
    imageGallery.innerHTML = ""; // Clear existing images

    images.forEach((image) => {
      const imgCard = document.createElement("div");
      imgCard.classList.add("img-card");

      const imgElement = document.createElement("img");
      imgElement.src = image.urls.small;
      imgElement.alt = image.alt_description;

      const downloadLink = document.createElement("a");
      downloadLink.href = image.links.download;
      downloadLink.classList.add("download-btn");
      downloadLink.innerHTML =
        '<img src="Images/download.svg" alt="download icon">';

      imgCard.appendChild(imgElement);
      imgCard.appendChild(downloadLink);
      imageGallery.appendChild(imgCard);
    });
  }
});
