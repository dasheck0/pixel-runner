import BaseScene from './base'

export default class GameScene extends BaseScene {
  constructor() {
    super('game');
    console.log("Started????");
  }

  create() {
    super.create();

    console.log(this);

    this.input.keyboard.on('keyup-' + 'W', function (event) {
      this.prefabs.player.start();
      this.prefabs.background.start();
    }, this);

    this.input.keyboard.on('keyup-' + 'S', function (event) {
      this.prefabs.player.stop();
      this.prefabs.background.stop();
    }, this);
  }

  update(time, delta) {
    this.prefabs.background.update(time, delta);
  }
}
