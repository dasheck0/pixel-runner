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
    }, this);

    this.input.keyboard.on('keyup-' + 'S', function (event) {
      this.prefabs.player.stop();
    }, this);
  }

  update(time, delta) {
    console.log("mouse", this.input.activePointer.worldX, this.input.activePointer.worldY);


    this.prefabs.background.update(time, delta);
  }
}
