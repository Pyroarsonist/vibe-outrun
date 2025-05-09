# Vibe Outrun

An Outrun-style racing game built with React and Phaser.js.

![Vibe Outrun Game](game-screenshot.png)

## Game Description

Vibe Outrun is a retro-style racing game inspired by the classic arcade game Outrun. Race through a synthwave landscape, avoid obstacles, and try to achieve the highest score possible!

### Features

- Retro-inspired graphics with a synthwave aesthetic
- Smooth acceleration and steering controls
- Obstacle avoidance gameplay
- Score tracking based on distance and speed
- Responsive design that works on various screen sizes

## How to Play

- Use the **UP** arrow key to accelerate
- Use the **DOWN** arrow key to brake
- Use the **LEFT/RIGHT** arrow keys to steer
- Avoid obstacles to maintain your speed
- The longer you drive without crashing, the higher your score!

## Technologies Used

- **React.js** - For the UI and application structure
- **Phaser.js** - For the game engine and rendering
- **JavaScript ES6** - For game logic and mechanics

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/vibe-outrun.git
   cd vibe-outrun
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Game Implementation Details

The game is built using Phaser.js integrated with React. Here's how it works:

- **React Components**: Handle the UI, game container, and state management
- **Phaser Scenes**: 
  - BootScene: Handles loading assets and displaying a loading screen
  - GameScene: Contains the main game logic, including:
    - Player movement
    - Road generation
    - Obstacle spawning
    - Collision detection
    - Score tracking

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Future Enhancements

- Add sound effects and background music
- Implement different levels with increasing difficulty
- Add power-ups and special abilities
- Create a high score leaderboard
- Add mobile touch controls

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the classic arcade game Outrun
- Built with React and Phaser.js
