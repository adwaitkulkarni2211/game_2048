import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const generateRandomBlock = (grid) => {
    let emptyBlocks = [];

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 0) {
          emptyBlocks.push({ row: i, col: j });
        }
      }
    }

    const block = emptyBlocks[Math.floor(Math.random() * emptyBlocks.length)];

    grid[block.row][block.col] = 2;
    console.log("random block:", block);
  };

  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      generateRandomBlock(grid);
    }
  }, []);

  let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const moveDown = () => {
    let didChange = false;

    for (let col = 0; col < grid[0].length; col++) {
      for (let row = grid.length - 2; row >= 0; row--) {
        if (grid[row][col] === 0) continue;

        let temp = row + 1;

        while (temp < grid.length && grid[temp][col] === 0) {
          temp++;
        }

        if (temp === row + 1 && grid[temp][col] !== grid[row][col]) {
          continue;
        }

        if (temp === grid.length || grid[temp][col] !== grid[row][col]) {
          grid[temp - 1][col] = grid[row][col];
        } else if (grid[temp][col] === grid[row][col]) {
          grid[temp][col] *= 2;
        }
        grid[row][col] = 0;

        didChange = true;
      }
    }

    if (didChange) generateRandomBlock(grid);
  };

  const moveUp = () => {
    let didChange = false;

    for (let col = 0; col < grid[0].length; col++) {
      for (let row = 1; row < grid.length; row++) {
        if (grid[row][col] === 0) continue;

        let temp = row - 1;

        while (temp >= 0 && grid[temp][col] === 0) {
          temp--;
        }

        if (temp === row - 1 && grid[temp][col] !== grid[row][col]) {
          continue;
        }

        if (temp === -1 || grid[temp][col] !== grid[row][col]) {
          grid[temp + 1][col] = grid[row][col];
        } else if (grid[temp][col] === grid[row][col]) {
          grid[temp][col] *= 2;
        }
        grid[row][col] = 0;

        didChange = true;
      }
    }

    if (didChange) generateRandomBlock(grid);
  };

  const moveRight = () => {
    let didChange = false;

    for (let row = 0; row < grid.length; row++) {
      for (let col = grid[0].length - 2; col >= 0; col--) {
        if (grid[row][col] === 0) continue;

        let temp = col + 1;

        while (temp < grid[0].length && grid[row][temp] === 0) {
          temp++;
        }

        if (temp === col + 1 && grid[row][temp] !== grid[row][col]) {
          continue;
        }

        if (temp === grid[0].length || grid[row][temp] !== grid[row][col]) {
          grid[row][temp - 1] = grid[row][col];
        } else if (grid[row][temp] === grid[row][col]) {
          grid[row][temp] *= 2;
        }
        grid[row][col] = 0;

        didChange = true;
      }
    }

    if (didChange) generateRandomBlock(grid);
  };

  const moveLeft = () => {
    let didChange = false;

    for (let row = 0; row < grid.length; row++) {
      for (let col = 1; col < grid[0].length; col++) {
        if (grid[row][col] === 0) continue;

        let temp = col - 1;

        while (temp >= 0 && grid[row][temp] === 0) {
          temp--;
        }

        if (temp === col - 1 && grid[row][temp] !== grid[row][col]) {
          continue;
        }

        if (temp === -1 || grid[row][temp] !== grid[row][col]) {
          grid[row][temp + 1] = grid[row][col];
        } else if (grid[row][temp] === grid[row][col]) {
          grid[row][temp] *= 2;
        }
        grid[row][col] = 0;

        didChange = true;
      }
    }

    if (didChange) generateRandomBlock(grid);
  };

  useEffect(() => {
    const detectKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        moveDown();
      } else if (e.key === "ArrowUp") {
        moveUp();
      } else if (e.key === "ArrowLeft") {
        moveLeft();
      } else if (e.key === "ArrowRight") {
        moveRight();
      }
      console.log(grid);
    };

    document.addEventListener("keydown", detectKeyDown);

    return () => document.removeEventListener("keydown", detectKeyDown);
  }, []);

  return (
    <div className="App">
      {grid.map((row, idx) => (
        <div key={idx}>
          {row.map((block, idx) => (
            <span key={idx}>{block === 0 ? "_" : block} </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
