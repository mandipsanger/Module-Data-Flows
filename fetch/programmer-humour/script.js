```js
function getLatestComic() {
  fetch("https://xkcd.now.sh/?comic=latest")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch comic");
      }

      return response.json();
    })
    .then((data) => {
      // Log the received JSON data
      console.log(data);

      // Get the container
      const comicContainer = document.getElementById("comic-container");

      // Create an img element
      const comicImage = document.createElement("img");

      // Use the img property from the API
      comicImage.src = data.img;

      // Add alt text
      comicImage.alt = data.title;

      // Remove loading message
      comicContainer.innerHTML = "";

      // Add the image to the page
      comicContainer.appendChild(comicImage);
    })
    .catch((error) => {
      console.error("Error:", error);

      const comicContainer = document.getElementById("comic-container");

      comicContainer.innerHTML = "<p>Sorry, we couldn't load the comic.</p>";
    });
}

// Make the API call
getLatestComic();
```;
//
