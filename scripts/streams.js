/* used this helpful Youtube video as the starting point for the puzzle game design: https://www.youtube.com/watch?v=sD3Os4H_EOU&t=1s&ab_channel=KennyYipCoding */

let rows;
let columns;

let currTile;
let otherTile;

let turns = 0;

let hintButton = document.getElementById("hint");
let container = document.getElementById("hint-image-container");
let completeImage = document.getElementById("hint-image");

let completionStatus = {
    easy: false,
    medium: false,
    hard: false
  };

document.getElementById("easy").addEventListener("click", function() {
    rows = 3;
    columns = 3;
    generatePuzzle();
});

document.getElementById("medium").addEventListener("click", function () {
  if (completionStatus.easy) {
    rows = 4;
    columns = 4;
    generatePuzzle();
  } else {
    Swal.fire({
      title: 'Oops!',
      text: "It looks like you haven't completed the easy mode yet. Give it another go, and you'll unlock the medium mode in no time!",
      icon: 'warning',
      confirmButtonText: 'Ok',
      customClass: {
        container: 'swal-container',
        title: 'swal-title',
        content: 'swal-content',
        icon: 'swal-icon',
        confirmButton: 'swal-confirm-button'
      }
    });}      
});

document.getElementById("hard").addEventListener("click", function () {
  if (completionStatus.medium) {
    rows = 5;
    columns = 5;
    generatePuzzle();
  } else {
    Swal.fire({
      title: 'Hold on!',
      text: "The hard mode is still locked. Make sure to conquer the medium mode first, and you'll be ready to take on the hardest challenges!",
      icon: 'warning',
      confirmButtonText: 'Ok',
      customClass: {
        container: 'swal-container',
        title: 'swal-title',
        content: 'swal-content',
        icon: 'swal-icon',
        confirmButton: 'swal-confirm-button'
      }
    });}
});

function generatePuzzle() {
    let images = [];
    let prefix;
    let start;
  
    let board = document.getElementById("board");
    board.className = ""; 
  
    if (rows === 3 && columns === 3) {
      prefix = 'neo';
      start = 101;
      board.classList.add("board-3x3");
    } else if (rows === 4 && columns === 4) {
      prefix = 'neo';
      start = 201;
      board.classList.add("board-4x4");
    } else if (rows === 5 && columns === 5) {
      prefix = 'neo';
      start = 301;
      board.classList.add("board-5x5");
    }

    for (let i = 0; i < rows * columns; i++) {
        images.push("./images/" + prefix + (start + i).toString() + ".jpg");
    }

    loadImages(images);
}

function loadImages(images) {
  let board = document.getElementById("board");
  board.innerHTML = '';

  images.sort(() => Math.random() - 0.5);

  let counter = 1;
  for (let r=0; r < rows; r++) {
      for (let c=0; c < columns; c++) {
          
          let tile = document.createElement("img");
          tile.id = r.toString() + "-" + c.toString();
          tile.src = images[counter-1];

          tile.addEventListener("dragstart", dragstart);
          tile.addEventListener("dragover", dragover);
          tile.addEventListener("dragenter", dragenter);
          tile.addEventListener("dragleave", dragleave);
          tile.addEventListener("drop", dragdrop);
          tile.addEventListener("dragend", dragend);

          document.getElementById("board").append(tile);
          counter++;
      }
  }
  turns = 0;
  document.getElementById("turns").innerText = turns;
};

function checkCompletion() {
  let tiles = document.querySelectorAll("#board img");
  let isCompleted = true;
  let start;

  if (rows === 3 && columns === 3) {
    start = 101;
  } else if (rows === 4 && columns === 4) {
    start = 201;
  } else if (rows === 5 && columns === 5) {
    start = 301;
  }

  tiles.forEach((tile, index) => {
    let correctImg = "neo" + (index + start) + ".jpg";
    let tileSrcFileName = tile.src.split("/").pop();
    if (tileSrcFileName !== correctImg) {
      isCompleted = false;
    }
  });

  if (isCompleted) {
    if (rows === 3 && columns === 3) {
      Swal.fire({
        title: 'Awesome job!',
        text: "You've successfully completed the easy mode. Time to move on to more challenging puzzles in the medium mode.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        customClass: {
          container: 'swal-container',
          title: 'swal-title',
          content: 'swal-content',
          icon: 'swal-icon',
          confirmButton: 'swal-confirm-button'
        }
      });
      completionStatus.easy = true;
    } else if (rows === 4 && columns === 4) {
      Swal.fire({
        title: 'Fantastic!',
        text: "You've completed the medium mode. Brace yourself for the ultimate challenge in the hard mode!",
        icon: 'warning',
        confirmButtonText: 'Ok',
        customClass: {
          container: 'swal-container',
          title: 'swal-title',
          content: 'swal-content',
          icon: 'swal-icon',
          confirmButton: 'swal-confirm-button'
        }
      });
      completionStatus.medium = true;
    } else if (rows === 5 && columns === 5) {
      Swal.fire({
        title: 'Congratulations!',
        text: "You've conquered the hard mode. You're a true puzzle master!",
        icon: 'warning',
        confirmButtonText: 'Ok',
        customClass: {
          container: 'swal-container',
          title: 'swal-title',
          content: 'swal-content',
          icon: 'swal-icon',
          confirmButton: 'swal-confirm-button'
        }
      });
    }
    turns = 0;
    document.getElementById("turns").innerText = turns;
  }
}
  
function dragstart() {
    currTile = this; //this refers to the img tile being dragged
};

function dragover(e) {
    e.preventDefault();
};

function dragenter(e) {
    e.preventDefault();
};

function dragleave(e) {
    e.preventDefault();
};

function dragdrop() {
    otherTile = this; //this refers to the img tile being dropped on
};

function dragend() {
    if (!otherTile) {
        return;
    }

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;

    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
        checkCompletion();
    }

    otherTile = null;
}

hintButton.addEventListener("mousedown", function () {
    if (rows === 3) {
        completeImage.src = `./images/neoclassicism31.jpeg`;
    } else if (rows === 4) {
        completeImage.src = `./images/neoclassicism41.jpeg`;
    } else if (rows === 5) {
        completeImage.src = `./images/neoclassicism51.jpeg`;
    }

    container.style.display = "block";
});
  
hintButton.addEventListener("mouseup", function () {
    container.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function() {
    rows = 3;
    columns = 3;
    generatePuzzle();
  });