let rows = 3;
let columns = 3;

let currTile;
let otherTile; //blank tile

let turns = 0;

window.onload = function() {
    let lastImage = "../images/rom19.jpg";
    images = ["../images/rom11.jpg", "../images/rom12.jpg", "../images/rom13.jpg", "../images/rom14.jpg", "../images/rom15.jpg", "../images/rom16.jpg", "../images/rom17.jpg", "../images/rom18.jpg"];
    loadImages(images, lastImage);

    document.getElementById("loadButton1").addEventListener("click", function() {
        images = ["../images/rom11.jpg", "../images/rom12.jpg", "../images/rom13.jpg", "../images/rom14.jpg", "../images/rom15.jpg", "../images/rom16.jpg", "../images/rom17.jpg", "../images/rom18.jpg"];
        loadImages(images, lastImage);
    });
    
    document.getElementById("loadButton2").addEventListener("click", function() {
        images = ["../images/rom21.jpg", "../images/rom22.jpg", "../images/rom23.jpg", "../images/rom24.jpg", "../images/rom25.jpg", "../images/rom26.jpg", "../images/rom27.jpg", "../images/rom28.jpg"];
        loadImages(images, lastImage);
    });
    
    document.getElementById("loadButton3").addEventListener("click", function() {
        images = ["../images/rom31.jpg", "../images/rom32.jpg", "../images/rom33.jpg", "../images/rom34.jpg", "../images/rom35.jpg", "../images/rom36.jpg", "../images/rom37.jpg", "../images/rom38.jpg"];
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

    if (!otherTile.src.includes('/images/rom19.jpg')) {
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
