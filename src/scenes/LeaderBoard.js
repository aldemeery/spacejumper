import { Scene } from 'phaser';
import Api from '../utils/Api';

export default class LeaderBoard extends Scene {
  constructor() {
    super('LeaderBoard');
  }

  // eslint-disable-next-line
  preload() {
    if (!window.localStorage.getItem('name')) {
      window.localStorage.setItem('name', window.prompt('Please provide a name: '));
    }
  }

  create() {
    this.title = this.add.text(600, 150, 'Leader Board', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);
    this.wait = this.add.text(600, 350, 'Please Wait...', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

    Api.addScore().then(() => {
      Api.getBoard().then(res => {
        this.wait.setVisible(false);
        res = res.result;
        let point = 350;
        let order = 1;
        res.sort((a, b) => ((parseInt(a.score, 10) < parseInt(b.score, 10)) ? 1 : -1));

        res.slice(0, 10).forEach(result => {
          this.add.text(600, point, `(${order}) - ${result.user} : ${result.score}`).setOrigin(0.5);
          point += 20;
          order += 1;
        });

        this.add.text(600, point + 30, 'Press any key...', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        window.localStorage.removeItem('name');
      });
    }).finally(() => {
      this.input.keyboard.on('keydown', () => {
        this.scene.start('Main');
      });
    });
  }
}
