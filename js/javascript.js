const imageFileInput = document.querySelector("#file");
const canvas = document.querySelector("#meme");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");
let randomize = document.querySelector("#random-btn");
let image;
let searchMeme = document.querySelector("#search-meme");
let giphyDisplay = document.querySelector("#giphy-display");
savedSearches();
// Generates a function to store searches in local storage.
function save(search){
  // if there is nothing saved at the start then save an empty array
  if(localStorage.getItem("session") == null){
    localStorage.setItem("session", "[]")
  }

  // get old data and slap it to the new data
  let old_data = JSON.parse(localStorage.getItem("session"));
  old_data.push(search)
  console.log(old_data, "hey old")

  // save the old and new data together
  localStorage.setItem("session", JSON.stringify(old_data))
}

// Generates a search dropdown under the search bar
function savedSearches(){
  if(localStorage.getItem("session") != null){
    let searchArray = JSON.parse(localStorage.getItem("session"));
    (console.log(searchArray))
    for (var i = 0; i < searchArray.length; i++) { 
      let dropdown = document.querySelector(".previous-searches");
      let options = document.createElement("option")
      options.value = searchArray[i];
      dropdown.append(options)
      console.log(options.value)
  }
  }
}
  
// Creates a function to randomize image from imageflip API
randomize.addEventListener("click", function randomizeImage() {
  let url = "https://api.imgflip.com/get_memes";
  fetch(url)
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .then((data) => {
      let getImagesIndex = Math.floor(Math.random() * data.data.memes.length);
      let randomImage = [];
      randomImage.push(data.data.memes[getImagesIndex].url);
      let finalRandomImage = randomImage[0];
      image = new Image();
      image.src = finalRandomImage;
      console.log(image)
      image.addEventListener(
        "load",
        () => {
          updateMemeCanvas(
            canvas,
            image,
            topTextInput.value,
            bottomTextInput.value
          );
        },
        { once: true }
      );
    })
    .catch(console.err);
});

// Creates a function to search through images for the Giphy API
searchMeme.addEventListener("click", function () {
  let searchQuery = document.querySelector(".texts").value;
  save(searchQuery)
  let limit = 9;
  let urlMeme =
    "https://api.giphy.com/v1/gifs/search?api_key=PdkNRVt59jQTuyCn6UBmpXpacH1ulMhA&q=" +
    searchQuery +
    "&limit=" +
    limit +
    "&offset=0&rating=g&lang=en";

  fetch(urlMeme)
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .then((data) => {
      giphyDisplay.innerHTML = ` `;
      console.log(data, "GIFSITE")
      let gifImages = [];
      for (let i = 0; i < 9; i++) {
        gifImages.push(data.data[i].images.original.url); 
        console.log(gifImages)
        let imageG = document.createElement("img")
        imageG.setAttribute("class", "nine-images")
        imageG.setAttribute("id", "gif")
        // imageG.setAttribute("onclick", "select_img(this.src)")
        imageG.src = gifImages[i]
        giphyDisplay.append(imageG)
        // giphyDisplay.innerHTML += `<img src        
        // ="${gifImages[i]}" class="nine-images" onclick="select_img(this.src)"><br>`;

        let nineImages = document.querySelector("#gif")

        $(document).on('click', '#gif', function select_img(src) {
          console.log(src)
          nineImages.value=src;
          // console.log(src.path[0].currentSrc)
          image = new Image();
          image.src = src.currentTarget.currentSrc;
          console.log(image)
          image.addEventListener(
            "load",
            () => {
              updateMemeCanvas(
                canvas,
                image,
                topTextInput.value,
                bottomTextInput.value
              );
            },
          );
        }) 
        

      // }

    
      }
    })
    .catch(console.err);

  // generateSelection();
});

// Creates the image input for the canvas
imageFileInput.addEventListener("change", (e) => {
  const imageDataUrl = URL.createObjectURL(e.target.files[0]);

  image = new Image();
  image.src = imageDataUrl;
  console.log(image)
  image.addEventListener(
    "load",
    () => {
      updateMemeCanvas(
        canvas,
        image,
        topTextInput.value,
        bottomTextInput.value
      );
    },
    { once: true }
  );
});

// Creates the top text for the canvas
topTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

// Creates the bottom text for the canvas
bottomTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

// Creates a function to update canvas every time one of the variables is changes.
function updateMemeCanvas(canvas, image, topText, bottomText) {
  giphyDisplay.innerHTML = ` `;
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
  const yOffset = height / 25;

  // Update canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  // Prepare text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  // Add top text
  ctx.textBaseline = "top";
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  // Add bottom text
  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);
}
