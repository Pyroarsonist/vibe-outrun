import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.speed = 0;
    this.maxSpeed = 600;
    this.acceleration = 10;
    this.deceleration = 5;
    this.roadWidth = 2000;
    this.segmentLength = 100;
    this.rumbleLength = 3;
    this.trackLength = null;
    this.lanes = 3;
    this.playerX = 0;
    this.playerY = 0;
    this.position = 0;
    this.cameraHeight = 1000;
    this.cameraDepth = 0.84;
    this.score = 0;
    this.obstacles = [];
    this.palms = [];
  }

  create() {
    // Create sky background (gradient)
    const skyTexture = this.createSkyTexture();
    this.sky = this.add.tileSprite(400, 300, 800, 600, skyTexture);

    // Create road
    const roadTexture = this.createRoadTexture();
    this.road = this.add.tileSprite(400, 450, 800, 300, roadTexture);

    // Create player car
    const carTexture = this.createCarTexture();
    this.player = this.physics.add.sprite(400, 500, carTexture);
    this.player.setCollideWorldBounds(true);

    // Create obstacles group
    this.obstaclesGroup = this.physics.add.group();

    // Create palms group
    this.palmsGroup = this.physics.add.group();

    // Add collision between player and obstacles
    this.physics.add.collider(this.player, this.obstaclesGroup, this.hitObstacle, null, this);

    // Set up keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', { 
      fontSize: '32px', 
      fill: '#fff',
      stroke: '#000',
      strokeThickness: 4
    });

    // Create speed text
    this.speedText = this.add.text(16, 56, 'Speed: 0 mph', { 
      fontSize: '24px', 
      fill: '#fff',
      stroke: '#000',
      strokeThickness: 3
    });

    // Set up timers for spawning obstacles and palms
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.spawnPalm,
      callbackScope: this,
      loop: true
    });
  }

  update() {
    // Handle player input
    if (this.cursors.up.isDown) {
      this.speed += this.acceleration;
      if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
    } else if (this.cursors.down.isDown) {
      this.speed -= this.deceleration * 2;
      if (this.speed < 0) this.speed = 0;
    } else {
      this.speed -= this.deceleration;
      if (this.speed < 0) this.speed = 0;
    }

    if (this.cursors.left.isDown) {
      this.player.x -= 5;
    } else if (this.cursors.right.isDown) {
      this.player.x += 5;
    }

    // Update road and sky based on speed
    this.road.tilePositionY -= this.speed / 20;
    this.sky.tilePositionX += this.speed / 200;

    // Update score based on speed
    this.score += Math.floor(this.speed / 10);
    this.scoreText.setText('Score: ' + this.score);

    // Update speed display
    const speedMph = Math.floor(this.speed / 3);
    this.speedText.setText('Speed: ' + speedMph + ' mph');

    // Move obstacles and palms
    this.obstaclesGroup.children.iterate((obstacle) => {
      if (obstacle) {
        obstacle.y += this.speed / 10;
        if (obstacle.y > 600) {
          obstacle.destroy();
        }
      }
    });

    this.palmsGroup.children.iterate((palm) => {
      if (palm) {
        palm.y += this.speed / 10;
        if (palm.y > 600) {
          palm.destroy();
        }
      }
    });
  }

  spawnObstacle() {
    if (this.speed > 0) {
      const laneWidth = 800 / this.lanes;
      const lane = Phaser.Math.Between(0, this.lanes - 1);
      const x = (lane * laneWidth) + (laneWidth / 2);

      const obstacleTexture = this.createObstacleTexture();
      const obstacle = this.obstaclesGroup.create(x, -100, obstacleTexture);
      obstacle.setScale(0.5);
    }
  }

  spawnPalm() {
    if (this.speed > 0) {
      const side = Phaser.Math.Between(0, 1) === 0 ? -50 : 850;
      const palmTexture = this.createPalmTexture();
      const palm = this.palmsGroup.create(side, -100, palmTexture);
      palm.setScale(0.5);
    }
  }

  createSkyTexture() {
    const textureKey = 'sky-texture';

    // Check if texture already exists
    if (this.textures.exists(textureKey)) {
      return textureKey;
    }

    // Create a gradient for the sky
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    // Sky gradient (sunset-like colors for Outrun aesthetic)
    const width = 800;
    const height = 600;

    // Create gradient
    graphics.fillGradientStyle(0xff6200, 0xff6200, 0x0000ff, 0x0000ff, 1);
    graphics.fillRect(0, 0, width, height);

    // Add some stars/grid lines for the Outrun aesthetic
    graphics.lineStyle(2, 0xffffff, 0.3);
    for (let i = 0; i < 20; i++) {
      const y = i * 30;
      graphics.beginPath();
      graphics.moveTo(0, y);
      graphics.lineTo(width, y);
      graphics.strokePath();
    }

    graphics.generateTexture(textureKey, width, height);
    graphics.destroy();

    return textureKey;
  }

  createRoadTexture() {
    const textureKey = 'road-texture';

    // Check if texture already exists
    if (this.textures.exists(textureKey)) {
      return textureKey;
    }

    // Create a road texture
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    const width = 800;
    const height = 300;

    // Road background
    graphics.fillStyle(0x333333);
    graphics.fillRect(0, 0, width, height);

    // Road markings
    graphics.fillStyle(0xffffff);
    for (let i = 0; i < 10; i++) {
      graphics.fillRect(width / 2 - 5, i * 40, 10, 20);
    }

    // Side lines
    graphics.lineStyle(5, 0xffffff, 1);
    graphics.beginPath();
    graphics.moveTo(100, 0);
    graphics.lineTo(100, height);
    graphics.moveTo(width - 100, 0);
    graphics.lineTo(width - 100, height);
    graphics.strokePath();

    graphics.generateTexture(textureKey, width, height);
    graphics.destroy();

    return textureKey;
  }

  createCarTexture() {
    const textureKey = 'car-texture';

    // Check if texture already exists
    if (this.textures.exists(textureKey)) {
      return textureKey;
    }

    // Create a car texture
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    // Car body
    graphics.fillStyle(0xff0000);
    graphics.fillRect(0, 0, 40, 70);

    // Car windows
    graphics.fillStyle(0x333333);
    graphics.fillRect(5, 5, 30, 20);

    // Car lights
    graphics.fillStyle(0xffff00);
    graphics.fillRect(5, 65, 10, 5);
    graphics.fillRect(25, 65, 10, 5);

    graphics.generateTexture(textureKey, 40, 70);
    graphics.destroy();

    return textureKey;
  }

  createObstacleTexture() {
    const textureKey = 'obstacle-texture-' + Math.floor(Math.random() * 1000);

    // Create an obstacle texture
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    // Random color for variety
    const colors = [0x0000ff, 0x00ff00, 0xffff00, 0xff00ff];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Obstacle body
    graphics.fillStyle(color);
    graphics.fillRect(0, 0, 50, 50);

    // Obstacle details
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.strokeRect(5, 5, 40, 40);

    graphics.generateTexture(textureKey, 50, 50);
    graphics.destroy();

    return textureKey;
  }

  createPalmTexture() {
    const textureKey = 'palm-texture-' + Math.floor(Math.random() * 1000);

    // Create a palm tree texture
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    // Tree trunk
    graphics.fillStyle(0x8B4513);
    graphics.fillRect(25, 30, 20, 70);

    // Tree leaves
    graphics.fillStyle(0x00ff00);
    graphics.fillTriangle(35, 0, 0, 50, 70, 50);
    graphics.fillTriangle(35, 15, 5, 60, 65, 60);
    graphics.fillTriangle(35, 30, 10, 70, 60, 70);

    graphics.generateTexture(textureKey, 70, 100);
    graphics.destroy();

    return textureKey;
  }

  hitObstacle(player, obstacle) {
    this.speed = Math.max(0, this.speed - 100);
    obstacle.destroy();

    // Flash the player to indicate collision
    this.cameras.main.flash(500, 255, 0, 0);
    this.cameras.main.shake(250, 0.01);
  }
}

export default GameScene;
