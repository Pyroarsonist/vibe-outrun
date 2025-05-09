import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import BootScene from '../../game/scenes/BootScene';
import GameScene from '../../game/scenes/GameScene';
import './Game.css';

const Game = () => {
  const gameContainerRef = useRef(null);
  const game = useRef(null);

  useEffect(() => {
    if (gameContainerRef.current && !game.current) {
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameContainerRef.current,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false
          }
        },
        scene: [BootScene, GameScene]
      };

      // Create the game instance
      game.current = new Phaser.Game(config);

      // Clean up function
      return () => {
        if (game.current) {
          game.current.destroy(true);
          game.current = null;
        }
      };
    }
  }, []);

  return (
    <div className="game-container">
      <div ref={gameContainerRef} className="phaser-container" />
    </div>
  );
};

export default Game;
