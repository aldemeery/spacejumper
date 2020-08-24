import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: 1280,
  height: 768,
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1250 },
      debug: false,
    },
  },
};
