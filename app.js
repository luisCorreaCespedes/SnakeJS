// Constants and variables
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

let xVelocity = 0;
let yVelocity = 0;

// Events
document.body.addEventListener('keydown', keyDown);

// Game loop
function drawGame() {
    clearScreen();
    position();
    drawSnake();
    setTimeout(drawGame, 1000/speed);
}

// Clear screen
function clearScreen() {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw player
function drawSnake() {
    ctx.fillStyle = '#438a71';
    ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);
}

// Change player position
function position() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

// Move player
function keyDown(event) {
    // Move up
    if(event.keyCode == 38) {
        yVelocity = -1;
        xVelocity = 0;
    }
    // Move down
    if(event.keyCode == 40) {
        yVelocity = 1;
        xVelocity = 0;
    }
    // Move left
    if(event.keyCode == 37) {
        yVelocity = 0;
        xVelocity = -1;
    }
    // Move right
    if(event.keyCode == 39) {
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();