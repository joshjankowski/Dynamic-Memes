let url = "https://api.imgflip.com/get_memes";
// Variable that will save all 100 images to an array
let allImages;
let imageDisplay = document.querySelector("#image-display");
let giphyDisplay = document.querySelector("#giphy-display");
let randomize = document.querySelector("#random-btn");
let getImagesIndex = "";
let eachContainer = "";
let searchMeme = document.querySelector("#search-meme");
let img = document.querySelector('#myImg');
let file = document.querySelector('#file');
let remove = document.querySelector('#remove-text');

function randomizeImage() {
  fetch(url)
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .then((data) => {
      img.setAttribute("class", "none")
      let getImagesIndex = Math.floor(Math.random() * data.data.memes.length);
      let randomImage = [];
      randomImage.push(data.data.memes[getImagesIndex].url);
      let finalRandomImage = randomImage[0];
      imageDisplay.innerHTML = `<img src="${finalRandomImage}" id="random-photo">
        `;
    })
    .catch(console.err);
}

randomize.addEventListener("click", function callImage() {
  randomizeImage();
});

searchMeme.addEventListener("click", function () {
  giphyDisplay.innerHTML = ` `;
  let searchQuery = document.querySelector(".texts").value;
  console.log(searchQuery, "search");
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
      console.log(data, "GIFSITE")
      let gifImages = [];
      for (let i = 0; i < 9; i++) {
        gifImages.push(data.data[i].images.original.url); 
        giphyDisplay.innerHTML += `<img src
        
        ="${gifImages[i]}" class="nine-images"><br>`;    
      }
      console.log(gifImages, "here");
    })
    .catch(console.err);

  // generateSelection();
});

let inputTextBox = document.querySelector("#value")
let submitText = document.querySelector("#submit-text")
let topText = document.querySelector(".top")
let bottomText = document.querySelector(".bottom")
var ele = document.getElementsByName('text');

remove.addEventListener("click", function(){
  topText.textContent = "";
  bottomText.textContent = "";
})

submitText.addEventListener("click", function(){
let inPutText = inputTextBox.value;
for(i = 0; i < ele.length; i++) {
  // Select Top Text
  if(ele[0].checked) {
    topText.textContent = inPutText;
    } else {
      // Select Bottom Text
    bottomText.textContent = inPutText;
    }
}

})

// Code to move text moveable
let selected = null, // Object of the element to be moved
  x_pos = 0,
  y_pos = 0, // Stores x & y coordinates of the mouse pointer
  x_elem = 0,
  y_elem = 0; // Stores top, left values (edge) of the element

// Will be called when user starts dragging an element
function _drag_init(elem) {
  // Store the object of the element which needs to be moved
  selected = elem;
  x_elem = x_pos - selected.offsetLeft;
  y_elem = y_pos - selected.offsetTop;
}

// Will be called when user dragging an element
function _move_elem(e) {
  x_pos = document.all ? window.event.clientX : e.pageX;
  y_pos = document.all ? window.event.clientY : e.pageY;
  if (selected !== null) {
    selected.style.left = (x_pos - x_elem) + 'px';
    selected.style.top = (y_pos - y_elem) + 'px';
  }
}

// Destroy the object when we are done
function _destroy() {
  selected = null;
}

// Bind the functions...
document.querySelector(".moveable").onmousedown = function() {
  _drag_init(this);
  return false;
};

document.onmousemove = _move_elem;
document.onmouseup = _destroy;

// Upload Your Own Image Functionality
window.addEventListener('load', function() {
  document.querySelector('input[type="file"]').addEventListener('change', function() {
    imageDisplay.innerHTML = "";
      if (this.files && this.files[0]) {
          let img = document.querySelector('#myImg');
          img.removeAttribute("class")
          img.onload = () => {
              URL.revokeObjectURL(img.src);  // no longer needed, free memory
          }

          img.src = URL.createObjectURL(this.files[0]); // set src to blob url
      }
  });
});


    


