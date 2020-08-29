import { Physics, Math } from 'phaser';

export default class Player extends Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 300, 650, 'player');
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.setCollideWorldBounds(true);
    this.registerAnimations();
  }

  registerAnimations() {
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'turn',
      frames: [{ key: 'player', frame: 4 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  static get xVelocity() {
    return 300;
  }

  static get yVelocity() {
    return 800;
  }

  moveLeft() {
    this.setVelocityX(-Player.xVelocity);
    this.anims.play('left', true);
  }

  moveRight() {
    this.setVelocityX(Player.xVelocity);
    this.anims.play('right', true);
  }

  standStill() {
    this.setVelocityX(0);
    this.anims.play('turn', true);
  }

  jump() {
    this.setVelocityY(-Player.yVelocity);
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {
        child.enableBody(true, child.x, 0, true, true);
      });

      const x = (this.x < 400) ? Math.Between(400, 800) : Math.Between(0, 400);

      const bomb = this.bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }

  hitBomb() {
    this.scene.physics.pause();

    this.setTint(0xff0000);

    this.anims.play('turn');

    this.scene.gameOver = true;
    this.scene.gameOverText.setVisible(true);
  }
}
