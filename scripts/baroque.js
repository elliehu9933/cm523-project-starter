let rows = 3;
let columns = 3;

let currTile;
let otherTile; //blank tile

let turns = 0;

window.onload = function() {
    let lastImage = "../images/bar19.jpg";
    images = ["../images/bar11.jpg", "../images/bar12.jpg", "../images/bar13.jpg", "../images/bar14.jpg", "../images/bar15.jpg", "../images/bar16.jpg", "../images/bar17.jpg", "../images/bar18.jpg"];
    loadImages(images, lastImage);

    document.getElementById("loadButton1").addEventListener("click", function() {
        images = ["../images/bar11.jpg", "../images/bar12.jpg", "../images/bar13.jpg", "../images/bar14.jpg", "../images/bar15.jpg", "../images/bar16.jpg", "../images/bar17.jpg", "../images/bar18.jpg"];
        loadImages(images, lastImage);
    });
    
    document.getElementById("loadButton2").addEventListener("click", function() {
        images = ["../images/bar21.jpg", "../images/bar22.jpg", "../images/bar23.jpg", "../images/bar24.jpg", "../images/bar25.jpg", "../images/bar26.jpg", "../images/bar27.jpg", "../images/bar28.jpg"];
        loadImages(images, lastImage);
    });
    
    document.getElementById("loadButton3").addEventListener("click", function() {
        images = ["../images/bar31.jpg", "../images/bar32.jpg", "../images/bar33.jpg", "../images/bar34.jpg", "../images/bar35.jpg", "../images/bar36.jpg", "../images/bar37.jpg", "../images/bar38.jpg"];
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

    if (!otherTile.src.includes('/images/bar19.jpg')) {
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
