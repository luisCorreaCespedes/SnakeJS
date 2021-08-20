// Constants and variables
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

class PlayerBody {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;

const snakeParts = [];
let tailLenght = 2;

let fruitX = 5;
let fruitY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const glupSound = new Audio('./resources/music/glup.mp3');
const overSound = new Audio('./resources/music/over.mp3');

// Events
document.body.addEventListener('keydown', keyDown);

// Game loop
function drawGame() {
    positionPlayer();
    let result = isGameOver();
    if(result) {
        return;
    }
    clearScreen();
    fruitCollision();
    drawFruit();
    drawPlayer();
    drawScore();

    // Levels
    if(score >= 5) {
        speed = 8;
    }
    else if(score >= 10) {
        speed = 9;
    }
    else if(score >= 15) {
        speed = 10;
    }
    else if(score >= 20) {
        speed = 11;
    }

    setTimeout(drawGame, 1000/speed);
}

// Game over
function isGameOver() {
    let gameOver = false;
    if(yVelocity === 0 && xVelocity === 0) {
        return false;
    }
    // Walls collisions
    if(headX < 0) {
        gameOver = true;
    }
    else if(headX === tileCount) {
        gameOver = true;
    }
    else if(headY < 0) {
        gameOver = true;
    }
    else if(headY === tileCount) {
        gameOver = true;
    }
    // Player collisions
    for(let i=0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if(gameOver) {
        ctx.fillStyle = 'black';
        ctx.font = '50px Verdana';
        if(gameOver) {
            ctx.fillStyle = 'black';
            ctx.font = '50px Verdana';
            ctx.fillText('Game Over!', canvas.width / 7, canvas.height / 2);
            overSound.play();
        }
    }
    return gameOver;
}

// Clear screen
function clearScreen() {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw score
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '15px Verdana';
    ctx.fillText('Score: ' + score, canvas.width-90, 15);
}

// Draw player
function drawPlayer() {
    ctx.fillStyle = '#438a71';
    for(let i=0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    // Put snake parts
    snakeParts.push(new PlayerBody(headX, headY));
    // Remove snake parts from the beginning
    while(snakeParts.length > tailLenght) {
        snakeParts.shift();
    }
    ctx.fillStyle = 'green';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

// Change player position
function positionPlayer() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

// Draw fruit
function drawFruit() {
    ctx.fillStyle = 'red';
    ctx.fillRect(fruitX * tileCount, fruitY * tileCount, tileSize, tileSize);
}

// Check fruit collision
function fruitCollision() {
    if(fruitX === headX && fruitY == headY){
        fruitX = Math.floor(Math.random() * tileCount);
        fruitY = Math.floor(Math.random() * tileCount);
        tailLenght++;
        score++;
        glupSound.play();
    }
}

// Move player
function keyDown(event) {
    // Move up
    if(event.keyCode == 38 || event.keyCode == 87) {
        if(yVelocity == 1) {
            return;
        }
        yVelocity = -1;
        xVelocity = 0;
    }
    // Move down
    if(event.keyCode == 40 || event.keyCode == 83) {
        if(yVelocity == -1) {
            return;
        }
        yVelocity = 1;
        xVelocity = 0;
    }
    // Move left
    if(event.keyCode == 37 || event.keyCode == 65) {
        if(xVelocity == 1) {
            return;
        }
        yVelocity = 0;
        xVelocity = -1;
    }
    // Move right
    if(event.keyCode == 39 || event.keyCode == 68) {
        if(xVelocity == -1) {
            return;
        }
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();