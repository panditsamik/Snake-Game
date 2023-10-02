document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("game-board");
  const gridSize = 15;
  const cellSize = gameBoard.offsetWidth / gridSize;

  let snake = [{ x: 5, y: 5 }];
  let direction = "right";
  let food = getRandomPosition();
  let score = 0;
  let gameInterval;

  const scoreDisplay = document.getElementById("score");
  const gameOverMessage = document.getElementById("game-over");
  const replayButton = document.getElementById("replay-button");

  function getRandomPosition() {
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);
      return { x, y };
  }

  function drawSnake() {
      for (const segment of snake) {
          const snakeSegment = document.createElement("div");
          snakeSegment.className = "snake-segment";
          snakeSegment.style.left = segment.x * cellSize + "px";
          snakeSegment.style.top = segment.y * cellSize + "px";
          gameBoard.appendChild(snakeSegment);
      }
  }

  function drawFood() {
      const foodElement = document.createElement("div");
      foodElement.className = "food";
      foodElement.style.left = food.x * cellSize + "px";
      foodElement.style.top = food.y * cellSize + "px";
      gameBoard.appendChild(foodElement);
  }

  function moveSnake() {
      let newHead = { ...snake[0] };

      switch (direction) {
          case "up":
              newHead.y -= 1;
              break;
          case "down":
              newHead.y += 1;
              break;
          case "left":
              newHead.x -= 1;
              break;
          case "right":
              newHead.x += 1;
              break;
      }

      snake.unshift(newHead);

      if (newHead.x === food.x && newHead.y === food.y) {
          // Snake ate the food
          score += 10;
          scoreDisplay.textContent = "Score: " + score;
          food = getRandomPosition();
      } else {
          // Remove the tail segment
          snake.pop();
      }
  }

  function checkCollision() {
      const head = snake[0];
      // Check if the snake hits the wall or itself
      if (
          head.x < 0 ||
          head.y < 0 ||
          head.x >= gridSize ||
          head.y >= gridSize ||
          isSnakeSegment(head, snake.slice(1))
      ) {
          gameOver();
      }
  }

  function isSnakeSegment(segment, segments) {
      for (const s of segments) {
          if (segment.x === s.x && segment.y === s.y) {
              return true;
          }
      }
      return false;
  }

  function clearBoard() {
      while (gameBoard.firstChild) {
          gameBoard.removeChild(gameBoard.firstChild);
      }
  }

  function resetGame() {
      snake = [{ x: 5, y: 5 }];
      direction = "right";
      food = getRandomPosition();
      score = 0;
      scoreDisplay.textContent = "Score: " + score;
      gameOverMessage.style.display = "none";
      replayButton.style.display = "none";
  }

  function startGame() {
      clearBoard();
      drawSnake();
      drawFood();
      scoreDisplay.textContent = "Score: " + score;
      gameInterval = setInterval(() => {
          moveSnake();
          checkCollision();
          clearBoard();
          drawSnake();
          drawFood();
      }, 100);
  }

  function gameOver() {
    clearInterval(gameInterval);
    gameOverMessage.textContent = "Game Over"; // Set the message to "Game Over"
    gameOverMessage.style.display = "block";
    replayButton.style.display = "block";
  }

//   replayButton.addEventListener("click", () => {
//       resetGame();
//       startGame();
//   });

  replayButton.addEventListener("click", () => {
    replayButton.style.display = "none";
    gameOverMessage.textContent = "Starting...";
    setTimeout(() => {
        resetGame();
        startGame();
    }, 2000);
});


  startGame();

  document.addEventListener("keydown", (event) => {
      switch (event.key) {
          case "ArrowUp":
              if (direction !== "down") {
                  direction = "up";
              }
              break;
          case "ArrowDown":
              if (direction !== "up") {
                  direction = "down";
              }
              break;
          case "ArrowLeft":
              if (direction !== "right") {
                  direction = "left";
              }
              break;
          case "ArrowRight":
              if (direction !== "left") {
                  direction = "right";
              }
              break;
      }
  });
});
