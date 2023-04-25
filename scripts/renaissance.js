let rows = 3;
let columns = 3;

let currTile;
let otherTile; //blank tile

let turns = 0;

window.onload = function() {
    let lastImage = "../images/darkred.png";
    images = ["../images/ren11.jpg", "../images/ren12.jpg", "../images/ren13.jpg", "../images/ren14.jpg", "../images/ren15.jpg", "../images/ren16.jpg", "../images/ren17.jpg", "../images/ren18.jpg"];
    loadImages(images, lastImage);

    document.getElementById("loadButton1").addEventListener("click", function() {
        images = ["../images/ren11.jpg", "../images/ren12.jpg", "../images/ren13.jpg", "../images/ren14.jpg", "../images/ren15.jpg", "../images/ren16.jpg", "../images/ren17.jpg", "../images/ren18.jpg"];
        loadImages(images, lastImage);
    });
    
    document.getElementById("loadButton2").addEventListener("click", function() {
        images = ["../images/ren21.jpg", "../images/ren22.jpg", "../images/ren23.jpg", "../images/ren24.jpg", "../images/ren25.jpg", "../images/ren26.jpg", "../images/ren27.jpg", "../images/ren28.jpg"];
        loadImages(images, lastImage);
    });
    
    document.getElementById("loadButton3").addEventListener("click", function() {
        images = ["../images/ren31.jpg", "../images/ren32.jpg", "../images/ren33.jpg", "../images/ren34.jpg", "../images/ren35.jpg", "../images/ren36.jpg", "../images/ren37.jpg", "../images/ren38.jpg"];
        loadImages(images, lastImage);
    });
};

function loadImages(images, lastImage) {
    let board = document.getElementById("board");
    board.innerHTML = '';

    images.sort(() => Math.random() - 0.5);
    images.push(lastImage);

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
    console.log('dragend ');

    if (!otherTile.src.includes('../images/darkred.png')) {
        return;
    }
    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
};
