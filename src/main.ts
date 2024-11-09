import 'assets/style.css';

import Ball from 'entities/Ball';
import Vec2 from 'utils/Vector2';
import Paddle from 'entities/Paddle';
import { rgba, KeyCodes } from 'utils/util';

const canvas = document.getElementById('board')! as HTMLCanvasElement;

console.log(`canvas width: ${canvas.width}`);
console.log(`canvas height: ${canvas.height}`);

const CANVAS_CENTER_X = canvas.width / 2;
const CANVAS_CENTER_Y = canvas.height / 2;

let isPlayer2AI = true;
const keys = {
  up: false,
  down: false,
  w: false,
  s: false,
  arrowUp: false,
  arrowDown: false,
};
const score = { player1: 0, player2: 0 };

const ctx = canvas.getContext('2d')!;
const ball = new Ball([Ball.BALL_WIDTH, Ball.BALL_HEIGHT], new Vec2(CANVAS_CENTER_X, CANVAS_CENTER_Y));

const paddle1 = new Paddle(
  [Paddle.PADDLE_WIDTH, Paddle.PADDLE_HEIGHT],
  new Vec2(Paddle.PADDLE_WIDTH, CANVAS_CENTER_Y - Paddle.PADDLE_HEIGHT / 2),
);

const paddle2 = new Paddle(
  [Paddle.PADDLE_WIDTH, Paddle.PADDLE_HEIGHT],
  new Vec2(canvas.width - Paddle.PADDLE_WIDTH * 2, CANVAS_CENTER_Y - Paddle.PADDLE_HEIGHT / 2),
);

if (!ctx) throw new Error('Could not create 2d context!');
main();

function main() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Updates
  updatePaddles();
  updateBall();

  // Draws
  drawCenterLine();
  drawPaddles();
  drawBall();
  drawScore();

  requestAnimationFrame(main);
}

function drawPaddles() {
  // Draw paddles with fill

  for (const paddle of [paddle1, paddle2]) {
    ctx.fillStyle = 'white';
    ctx.fillRect(paddle.position.x, paddle.position.y, paddle.width, paddle.height);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'gray';
    ctx.strokeRect(paddle.position.x, paddle.position.y, paddle.width, paddle.height);
  }
}

function drawCenterLine() {
  ctx.strokeStyle = rgba(255, 255, 255, 0.5);
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 10]); // 10px dash,  10px gap

  // Draw the line down the center
  ctx.beginPath();
  ctx.moveTo(CANVAS_CENTER_X, -1);
  ctx.lineTo(CANVAS_CENTER_X, canvas.height);
  ctx.stroke();

  ctx.setLineDash([]); // Reset line dash
}

function drawBall() {
  ctx.beginPath();
  ctx.fillRect(ball.position.x, ball.position.y, Ball.BALL_WIDTH, Ball.BALL_HEIGHT);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.stroke();
}

function resetBall() {
  ball.position.setXY(canvas.width / 2, canvas.height / 2);

  ball.velocity.x *= -1;
  ball.velocity.y = Math.random() > 0.5 ? 4 : -4;
}

function updateBall() {
  ball.position.x += ball.velocity.x;
  ball.position.y += ball.velocity.y;

  // Check collision with paddles
  for (const paddle of [paddle1, paddle2]) {
    if (!isColliding(ball, paddle)) continue;

    ball.velocity.x *= -1;

    if (ball.position.x < paddle.position.x) {
      ball.position.x -= ball.width;
    } else if (ball.position.x > paddle.position.x) {
      ball.position.x += +paddle.width;
    }
  }

  // Wall collision on top and bottom
  if (ball.position.y - ball.height / 2 < 0 || ball.position.y + ball.height / 2 > canvas.height) {
    ball.velocity.y *= -1;
  }

  // Check if ball goes out of bounds for scoring
  if (ball.position.x - ball.width / 2 < 0) {
    score.player2 += 1;
    resetBall();
  } else if (ball.position.x + ball.width / 2 > canvas.width) {
    score.player1 += 1;
    resetBall();
  }
}

function drawScore() {
  ctx.font = '50px Zen Dots';
  ctx.fillText(score.player1.toString(), canvas.width / 4, 50);
  ctx.fillText(score.player2.toString(), (canvas.width * 3) / 4, 50);
}

function updatePaddles() {
  // Player 1 controls (W/S)
  if (keys.w && paddle1.position.y > 0) {
    paddle1.position.y -= paddle1.velocity.y;
  }
  if (keys.s && paddle1.position.y + paddle1.height < canvas.height) {
    paddle1.position.y += paddle1.velocity.y;
  }

  if (isPlayer2AI) {
    // Simple AI logic: make the paddle follow the ball's Y position
    const predictionOffset = (Math.random() - 0.5) * 150; // Random offset

    if (ball.position.y + predictionOffset < paddle2.position.y + paddle2.height / 2) {
      paddle2.position.y -= paddle2.velocity.y;
    } else if (ball.position.y + predictionOffset > paddle2.position.y + paddle2.height / 2) {
      paddle2.position.y += paddle2.velocity.y;
    }

    if (paddle2.position.y < 0) paddle2.position.y = 0;
    if (paddle2.position.y + paddle2.height > canvas.height) paddle2.position.y = canvas.height - paddle2.height;
  } else {
    // Real Player  2 controls (Arrow keys for Player 2)
    if (keys.arrowUp && paddle2.position.y > 0) {
      paddle2.position.y -= paddle1.velocity.y;
    }
    if (keys.arrowDown && paddle2.position.y + paddle2.height < canvas.height) {
      paddle2.position.y += paddle1.velocity.y;
    }
  }
}

function isColliding(ball: Ball, paddle: Paddle): boolean {
  return (
    ball.position.x < paddle.position.x + paddle.width &&
    ball.position.x + ball.height > paddle.position.x &&
    ball.position.y < paddle.position.y + paddle.height &&
    ball.position.y + ball.height > paddle.position.y
  );
}

document.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case KeyCodes.ArrowUp:
      keys.arrowUp = true;
      break;
    case KeyCodes.ArrowDown:
      keys.arrowDown = true;
      break;
    case KeyCodes.W:
      keys.w = true;
      break;
    case KeyCodes.S:
      keys.s = true;
      break;
    default:
      break;
  }
});

// Event listener for keyup
document.addEventListener('keyup', (e) => {
  switch (e.keyCode) {
    case KeyCodes.ArrowUp:
      keys.arrowUp = false;
      break;
    case KeyCodes.ArrowDown:
      keys.arrowDown = false;
      break;
    case KeyCodes.W:
      keys.w = false;
      break;
    case KeyCodes.S:
      keys.s = false;
      break;
    default:
      break;
  }
});
