const gameBoard = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetButton');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = '#4A8F35';
const snakeColour = 'rgb(25, 212, 8)';
const snakeBorder = 'rgb(24, 65, 20)';
const foodColour = '#BD234E';
const unitSize = 10;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize * 1, y: 0 },
    { x: 0, y: 0 }

];

window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

//buttons on mobile for directions

const arrowUp = document.querySelector('#arrowUp');
const arrowLeft = document.querySelector('#arrowLeft');
const arrowRight = document.querySelector('#arrowRight');
const arrowDown = document.querySelector('#arrowDown');


arrowUp.addEventListener('click', (e) => {
    e.preventDefault;
    if (arrowUp) {
        xVelocity = 0;
        yVelocity = -unitSize;
    }
});

arrowLeft.addEventListener('click', (e) => {
    if (arrowLeft) {
        xVelocity = -unitSize;
        yVelocity = 0;
    }

});

arrowRight.addEventListener('click', (e) => {
    if (arrowRight) {
        xVelocity = unitSize;
        yVelocity = 0;
    }
});

arrowDown.addEventListener('click', (e) => {
    e.preventDefault;
    if (arrowDown) {
        xVelocity = 0;
        yVelocity = unitSize;
    }
});


function toggleScreen(id, toggle) {
    let element = document.getElementById(id);
    let display = (toggle) ? "block" : "none";
    element.style.display = display;
}



function startGame() {
    toggleScreen('startScreen', false);
    toggleScreen('gameBoard', true);
    gameStart();
}

function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};


function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();

        }, 100);
    } else {
        displayGameOver();
    }
};


function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};


function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};


function drawFood() {
    ctx.fillStyle = foodColour;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
    // ctx.beginPath();
    // ctx.arc(foodX, foodY, unitSize / 2, 0, 2 * Math.PI);
    // ctx.fill();
};


function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);
    //if food is eaten
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
};


function drawSnake() {
    ctx.fillStyle = snakeColour;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};


function changeDirection(e) {
    const keyPressed = e.keyCode;

    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);

    switch (true) {
        case (keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }

};

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;

        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
};


function displayGameOver() {
    ctx.font = '40px Lilita One';
    ctx.fillStyle = '#FCB435';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', gameWidth / 2, gameHeight / 2)
    running = false;
};


function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize * 1, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart();
};


