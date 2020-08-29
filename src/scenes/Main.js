import { Scene, Math } from 'phaser';
import Player from '../objects/Player';

export default class Main extends Scene {
  constructor() {
    super('Main');
    this.gameOver = false;
  }

  preload() {
    this.load.image('sky', 'assets/bg.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.score = 0;
    window.localStorage.setItem('score', this.score);
    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
    this.gameOverText = this.add.text(600, 250, 'Game Over (Press any key)', { fontSize: '48px', fill: '#fff' }).setVisible(false).setDepth(2).setOrigin(0.5);

    this.bg = this.add.tileSprite(640, 374, 1280, 768, 'sky').setDepth(-1);

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(300, 200, 'ground');
    this.platforms.create(1010, 350, 'ground');
    this.platforms.create(375, 525, 'ground');
    this.platforms.create(600, 750, 'ground').setScale(3.5).refreshBody();

    this.player = new Player(this);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 15,
      setXY: { x: 12, y: 0, stepX: 83 },
    });

    this.stars.children.iterate((child) => {
      child.setBounceY(Math.FloatBetween(0.4, 0.8));
    });

    this.bombs = this.physics.add.group();

    this.physics.add.overlap(this.player, this.stars, this.player.collectStar, null, this);

    this.physics.add.collider(this.player, this.bombs, this.player.hitBomb, null, this.player);

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    this.input.keyboard.on('keydown', () => {
      if (this.gameOver) {
        this.gameOver = false;
        window.localStorage.setItem('score', this.score);
        this.scene.start('LeaderBoard');
      }
    });
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    } else {
      this.player.standStill();
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.jump();
    }
  }
}
