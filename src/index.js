import './style.css';
import Phaser from 'phaser';
import config from './config';
import Main from './scenes/Main';
import LeaderBoard from './scenes/LeaderBoard';

class Game extends Phaser.Game {
  constructor(config) {
    super(config);
    this.scene.add('Main', Main);
    this.scene.add('LeaderBoard', LeaderBoard);

    this.scene.start('Main');
  }
}

window.game = new Game(config);
