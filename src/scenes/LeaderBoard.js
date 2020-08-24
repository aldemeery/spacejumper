import { Scene } from 'phaser';

export default class LeaderBoard extends Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    this.gameOverText = this.add.text(600, 150, 'Leader Board', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);

    this.input.keyboard.on('keydown', () => {
      this.scene.start('Main');
    });
  }
}
