import React, { useState } from 'react';
import './App.css';
import Game from './components/Game/Game';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="App">
      {!gameStarted ? (
        <header className="App-header">
          <h1>Vibe Outrun</h1>
          <p>
            An Outrun-style racing game built with React and Phaser.js
          </p>
          <button 
            className="start-button"
            onClick={() => setGameStarted(true)}
          >
            Start Game
          </button>
          <div className="instructions">
            <h2>How to Play</h2>
            <ul>
              <li>Use <strong>UP</strong> arrow to accelerate</li>
              <li>Use <strong>DOWN</strong> arrow to brake</li>
              <li>Use <strong>LEFT/RIGHT</strong> arrows to steer</li>
              <li>Avoid obstacles to keep your speed up</li>
              <li>Drive as far as you can to get a high score!</li>
            </ul>
          </div>
        </header>
      ) : (
        <div className="game-wrapper">
          <Game />
          <button 
            className="back-button"
            onClick={() => setGameStarted(false)}
          >
            Back to Menu
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
