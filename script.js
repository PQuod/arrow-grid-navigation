//Array of images
let imgsAltitudes = [
  //Low
  [
    [
      "https://pquod.github.io/arrow-grid-navigation/LH-stratus.png",
      "Stratus"
    ],
    [
      "https://pquod.github.io/arrow-grid-navigation/LH_Stratocumulus.jpg",
      "Stratocumulus"
    ],
    [
      "https://pquod.github.io/arrow-grid-navigation/LH_Cumulus.webp",
      "Cumulus"
    ]
  ],
  //Middle
  [
    [
      "https://pquod.github.io/arrow-grid-navigation/MH_Altostratus.jpg",
      "Altostratus"
    ],
    [
      "https://pquod.github.io/arrow-grid-navigation/MH_Altocumulus.jpg",
      "altocumulus"
    ],
    [
      "https://pquod.github.io/arrow-grid-navigation/MH_Nimbostratus.jpg",
      "Nimbostratus"
    ]
  ],
  //High
  [
    [
      "https://pquod.github.io/arrow-grid-navigation/HH_Cirrostratus.webp",
      "Cirrostratus"
    ],
    [
      "https://pquod.github.io/arrow-grid-navigation/HH_Cirrocumulus.JPG",
      "Cirrocumulus"
    ],
    [
      "https://pquod.github.io/arrow-grid-navigation/HH_Cirrus.jpg",
      "Cirrus"
    ]
  ]
];

//Functions
//Variables
let currentImgsArray = [];
let posX = 0;
let posY = 0;

//Event listener(s)
document.onkeydown = checkKey;
checkPosY();

window.onload = startingPoint;

//Check where we are on Y axis and which array to assign to currentImgsArray[];
function checkPosY() {
  currentImgsArray = imgsAltitudes[posY];
}

function startingPoint() {
  console.log("posX=" + posX + " posY=" + posY);
  if (posX == 0 && posY == 0) {
    loadImg();
    generateMap(document.getElementById("map"));
    locateOnMap(document.getElementById("map"));
    legendDisplay(document.getElementById("legend"));
  }
}

function loadImg() {
  for (let i = 0; i < currentImgsArray.length; i++) {
    if (currentImgsArray.indexOf(currentImgsArray[i]) == posX) {
      document.body.style.backgroundImage =
        "url(" + currentImgsArray[i][0] + ")";
    }
  }
}

function checkKey(event) {
  // If right arrow is pressed and we haven't reached last position on the X axis
  if (
    (event.keyCode == "39" || event == "39") &&
    posX < currentImgsArray.length - 1
  ) {
    posX += 1;
  }
  // If left arrow is pressed and we haven't reach first position on the X axis
  else if ((event.keyCode == "37" || event == "37") && posX > 0) {
    posX -= 1;
  }
  // If up arrow is pressed and we have not reached top of Y axis
  else if (
    (event.keyCode == "38" || event == "38") &&
    posY < imgsAltitudes.length - 1
  ) {
    posY += 1;
    checkPosY();
  }
  // If down arrow is pressed and we have not reached bottom of Y axis
  else if ((event.keyCode == "40" || event == "40") && posY > 0) {
    posY -= 1;
    checkPosY();
  }
  loadImg();
  locateOnMap(document.getElementById("map"));
  legendDisplay(document.getElementById("legend"));
}

//Draw grid map
function generateMap(parentDiv) {
  for (let i = imgsAltitudes.length - 1; i >= 0; i--) {
    for (let j = 0; j < imgsAltitudes[i].length; j++) {
      const newP = document.createElement("p");
      newP.innerHTML = "&#9729;";
      newP.classList.add('inline-p');
      newP.classList.add(i + "_" + j);
      parentDiv.appendChild(newP);
    }
    let newBr = document.createElement("br");
    parentDiv.appendChild(newBr);
  }
}

function locateOnMap(map) {
  let imgPosX = 0;
  let imgPosY = 0;
  let children = map.getElementsByTagName("p");
  for (let i = 0; i < children.length; i++) {
    imgPositions = children[i].className.slice(children[i].className.indexOf(' ') + 1).split('_');
    imgPosX = parseInt(imgPositions[1]);
    imgPosY = parseInt(imgPositions[0]);
    if (posX == imgPosX && posY == imgPosY) {
      children[i].style.color = "Cornsilk";
    } else {
      children[i].style.color = "CornflowerBlue ";
    }
  }
}

//Display the correct legend associated to the image
function legendDisplay(legend) {
  for (let i = 0; i < currentImgsArray.length; i++) {
    if (i == posX) {
      if(posY == 0){
      legend.innerHTML = "<i>Low atmosphere</i> &middot; " +      currentImgsArray[i][1];
      }else if(posY == 1){
      legend.innerHTML = "<i>Middle atmosphere</i> &middot; " + currentImgsArray[i][1];
      }else if(posY == 2){
        legend.innerHTML = "<i>High atmosphere</i> &middot; " + currentImgsArray[i][1];
      }
    }
  }
}
