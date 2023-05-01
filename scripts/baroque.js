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
      alert(
        "Oops! It looks like you haven't completed the easy mode yet. Give it another go, and you'll unlock the medium mode in no time!"
      );
    }
  });
  
document.getElementById("hard").addEventListener("click", function () {
    if (completionStatus.medium) {
      rows = 5;
      columns = 5;
      generatePuzzle();
    } else {
      alert(
        "Hold on! The hard mode is still locked. Make sure to conquer the medium mode first, and you'll be ready to take on the hardest challenges!"
      );
    }
  });

function generatePuzzle() {
    let images = [];
    let prefix;
    let start;
  
    let board = document.getElementById("board");
    board.className = ""; 
  
    if (rows === 3 && columns === 3) {
      prefix = 'bar';
      start = 101;
      board.classList.add("board-3x3");
    } else if (rows === 4 && columns === 4) {
      prefix = 'bar';
      start = 201;
      board.classList.add("board-4x4");
    } else if (rows === 5 && columns === 5) {
      prefix = 'bar';
      start = 301;
      board.classList.add("board-5x5");
    }

    for (let i = 0; i < rows * columns; i++) {
        images.push("/images/" + prefix + (start + i).toString() + ".jpg");
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
        let correctImg = "bar" + (index + start) + ".jpg";
        let tileSrcFileName = tile.src.split("/").pop();
        if (tileSrcFileName !== correctImg) {
          isCompleted = false;
        }
      });
  
    if (isCompleted) {
      if (rows === 3 && columns === 3) {
        alert(
          "Awesome job! You've successfully completed the easy mode. Time to move on to more challenging puzzles in the medium mode."
        );
        completionStatus.easy = true;
      } else if (rows === 4 && columns === 4) {
        alert(
          "Fantastic! You've completed the medium mode. Brace yourself for the ultimate challenge in the hard mode!"
        );
        completionStatus.medium = true;
      } else if (rows === 5 && columns === 5) {
        alert(
          "Congratulations! You've conquered the hard mode. You're a true puzzle master!"
        );
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
        completeImage.src = `/images/baroque31.jpeg`;
    } else if (rows === 4) {
        completeImage.src = `/images/baroque41.jpeg`;
    } else if (rows === 5) {
        completeImage.src = `/images/baroque51.jpeg`;
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