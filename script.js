var blockSize = 25;
var total_row = 17; //total row number
var total_col = 17; //total column number
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var speedX = 0;
var speedY = 0;

var snakeBody = [];

var foodX;
var foodY;

var gameOver = false;
var score = 0;
var highestScore = 0;
var difficulty = 5; // Adjust this value for difficulty level

var startButton = document.getElementById("start-button");
var replayButton = document.getElementById("replay-button");

function init() {
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / difficulty);
}

function createSnakeSegment(x, y) {
    context.beginPath();
    context.arc(x + blockSize / 2, y + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
    context.fillStyle = "white";
    context.fill();
    context.closePath();
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "green";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score += 10;
        if (score > highestScore) {
            highestScore = score;
        }
        document.getElementById("score").innerText = "Score: " + score;
    }
    document.getElementById("highest-score").innerText = "Highest Score: " + highestScore;

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    createSnakeSegment(snakeX, snakeY);

    for (let i = 0; i < snakeBody.length; i++) {
        createSnakeSegment(snakeBody[i][0], snakeBody[i][1]);
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
high-score
            alert("Game Over\nScore: " + score + "\nHighest Score: " + highestScore);
            document.getElementById('highest').innerText = "Highest Score: " + highestScore;

            document.getElementById("game-over").style.display = "block";
            replayButton.style.display = "block";
            startButton.style.display = "none";

        }
    }

    if (
        snakeX < 0 ||
        snakeX > total_col * blockSize ||
        snakeY < 0 ||
        snakeY > total_row * blockSize
    ) {
        gameOver = true;

        alert("Game Over\nScore: " + score + "\nHighest Score: " + highestScore);
        document.getElementById('highest').innerText = "Highest Score: " + highestScore;

        document.getElementById("game-over").style.display = "block";
        replayButton.style.display = "block";
        startButton.style.display = "none";

    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    } else if (e.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}


function saveHighestScore() {
    localStorage.setItem("highestScore", highestScore);
}

function loadHighestScore() {
    highestScore = localStorage.getItem("highestScore") || 0;
}

loadHighestScore();

// When the window closes, it saves the high score
window.addEventListener("beforeunload", saveHighestScore);


// Add an event listener to the "Start Game" button
startButton.addEventListener("click", startGame);

function startGame() {
    // Retrieve the selected difficulty level from the dropdown
    var selectedDifficulty = parseInt(document.getElementById("difficulty").value);
    // Clear the existing canvas and start the game with the selected difficulty
    resetGame(selectedDifficulty);
}


function resetGame() {
    location.reload();
}
// Add an event listener to the "Replay" button
replayButton.addEventListener("click", function() {
    document.getElementById("game-over").style.display = "none";
    replayButton.style.display = "none";
    startButton.style.display = "block";
    resetGame(difficulty);
});

// Function to reset the game
// Function to reset the game
function resetGame(selectedDifficulty) {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    gameOver = false;
    score = 0;

    // Set the difficulty based on the selectedDifficulty or default to 5 if not provided
    difficulty = selectedDifficulty || 5;

    // Clear the existing interval timer
    clearInterval(interval);

    // Set the difficulty before initializing the game
    interval = setInterval(update, 1000 / difficulty);

    document.getElementById("score").innerText = "Score: " + score;

    init();
}



// Initial game setup
init();

