"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CELL = 20;
const COLS = 20;
const ROWS = 20;
const WIDTH = COLS * CELL;
const HEIGHT = ROWS * CELL;

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

function randomFood(snake: Point[]): Point {
  let food: Point;
  do {
    food = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "over">(
    "idle"
  );
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }]);
  const dirRef = useRef<Direction>("RIGHT");
  const nextDirRef = useRef<Direction>("RIGHT");
  const foodRef = useRef<Point>(randomFood(snakeRef.current));
  const loopRef = useRef<number>(0);
  const speedRef = useRef(120);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * CELL, 0);
      ctx.lineTo(x * CELL, HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * CELL);
      ctx.lineTo(WIDTH, y * CELL);
      ctx.stroke();
    }

    // Food
    const food = foodRef.current;
    ctx.fillStyle = "#f87171";
    ctx.shadowColor = "#f87171";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.roundRect(
      food.x * CELL + 3,
      food.y * CELL + 3,
      CELL - 6,
      CELL - 6,
      4
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Snake
    const snake = snakeRef.current;
    snake.forEach((seg, i) => {
      const isHead = i === 0;
      const alpha = 1 - (i / snake.length) * 0.5;
      ctx.fillStyle = isHead
        ? "#818cf8"
        : `rgba(99, 102, 241, ${alpha})`;
      if (isHead) {
        ctx.shadowColor = "#818cf8";
        ctx.shadowBlur = 10;
      }
      ctx.beginPath();
      ctx.roundRect(
        seg.x * CELL + 1,
        seg.y * CELL + 1,
        CELL - 2,
        CELL - 2,
        isHead ? 6 : 4
      );
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, []);

  const tick = useCallback(() => {
    dirRef.current = nextDirRef.current;
    const snake = snakeRef.current;
    const head = snake[0];
    const dir = dirRef.current;

    const next: Point = {
      x: head.x + (dir === "LEFT" ? -1 : dir === "RIGHT" ? 1 : 0),
      y: head.y + (dir === "UP" ? -1 : dir === "DOWN" ? 1 : 0),
    };

    // Wall collision
    if (next.x < 0 || next.x >= COLS || next.y < 0 || next.y >= ROWS) {
      setGameState("over");
      return;
    }

    // Self collision
    if (snake.some((s) => s.x === next.x && s.y === next.y)) {
      setGameState("over");
      return;
    }

    const newSnake = [next, ...snake];
    const food = foodRef.current;

    if (next.x === food.x && next.y === food.y) {
      foodRef.current = randomFood(newSnake);
      setScore((s) => {
        const newScore = s + 1;
        setHighScore((h) => Math.max(h, newScore));
        return newScore;
      });
      // Speed up slightly
      speedRef.current = Math.max(60, speedRef.current - 2);
    } else {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    draw();
  }, [draw]);

  const gameLoop = useCallback(() => {
    tick();
    loopRef.current = window.setTimeout(gameLoop, speedRef.current);
  }, [tick]);

  useEffect(() => {
    if (gameState === "playing") {
      loopRef.current = window.setTimeout(gameLoop, speedRef.current);
    }
    return () => clearTimeout(loopRef.current);
  }, [gameState, gameLoop]);

  useEffect(() => {
    draw();
  }, [draw]);

  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = "RIGHT";
    nextDirRef.current = "RIGHT";
    foodRef.current = randomFood(snakeRef.current);
    speedRef.current = 120;
    setScore(0);
    setGameState("playing");
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState !== "playing") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          startGame();
        }
        return;
      }

      const dir = dirRef.current;
      switch (e.key) {
        case "ArrowUp":
        case "w":
          e.preventDefault();
          if (dir !== "DOWN") nextDirRef.current = "UP";
          break;
        case "ArrowDown":
        case "s":
          e.preventDefault();
          if (dir !== "UP") nextDirRef.current = "DOWN";
          break;
        case "ArrowLeft":
        case "a":
          e.preventDefault();
          if (dir !== "RIGHT") nextDirRef.current = "LEFT";
          break;
        case "ArrowRight":
        case "d":
          e.preventDefault();
          if (dir !== "LEFT") nextDirRef.current = "RIGHT";
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameState, startGame]);

  // Touch controls
  const touchStart = useRef<Point | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || gameState !== "playing") return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;

    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;

    const dir = dirRef.current;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && dir !== "LEFT") nextDirRef.current = "RIGHT";
      else if (dx < 0 && dir !== "RIGHT") nextDirRef.current = "LEFT";
    } else {
      if (dy > 0 && dir !== "UP") nextDirRef.current = "DOWN";
      else if (dy < 0 && dir !== "DOWN") nextDirRef.current = "UP";
    }
    touchStart.current = null;
  };

  return (
    <section id="play" className="py-24 px-6 bg-surface-raised">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white">Take a Break</h2>
        <div className="mt-2 w-12 h-1 bg-accent rounded-full" />
        <p className="mt-4 text-gray-500">
          Use arrow keys or WASD to play. Swipe on mobile.
        </p>

        <div className="mt-8 flex flex-col items-center">
          {/* Score bar */}
          <div className="w-full max-w-[400px] flex items-center justify-between mb-4 px-1">
            <div className="text-sm text-gray-400">
              Score: <span className="text-white font-semibold">{score}</span>
            </div>
            <div className="text-sm text-gray-500">
              Best: <span className="text-gray-300 font-semibold">{highScore}</span>
            </div>
          </div>

          {/* Canvas wrapper */}
          <div
            className="relative rounded-xl border border-white/10 overflow-hidden"
            style={{ width: WIDTH, height: HEIGHT }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <canvas
              ref={canvasRef}
              width={WIDTH}
              height={HEIGHT}
              className="block"
            />

            {/* Overlay for idle / game over */}
            {gameState !== "playing" && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                {gameState === "over" && (
                  <p className="text-white text-lg font-semibold">
                    Game Over — {score} points
                  </p>
                )}
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 bg-accent hover:bg-accent-muted text-white text-sm font-medium rounded-lg transition-colors"
                >
                  {gameState === "over" ? "Play Again" : "Start Game"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
