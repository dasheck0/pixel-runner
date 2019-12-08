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
      this.prefabs.player.idle();
    }, this);

    this.input.keyboard.on('keyup-' + 'S', function (event) {
      this.prefabs.player.run();
    }, this);

    this.input.keyboard.on('keyup-' + 'E', function (event) {
      this.prefabs.player.wallJump();
    }, this);

    this.input.keyboard.on('keyup-' + 'R', function (event) {
      this.prefabs.player.hit();
    }, this);

    this.input.keyboard.on('keyup-' + 'T', function (event) {
      this.prefabs.player.doubleJump();
    }, this);

    this.input.keyboard.on('keyup-' + 'Q', function (event) {
      this.prefabs.player.flip();
    }, this);

    this.input.keyboard.on('keyup-' + 'Y', function (event) {
      this.prefabs.player.playerType = 'MaskDude';
    }, this);

    this.input.keyboard.on('keyup-' + 'X', function (event) {
      this.prefabs.player.playerType = 'NinjaFrog';
    }, this);

    this.physics.add.collider(this.prefabs.player, this.prefabs.level.backgroundLayer);
  }

  update(time, delta) {
    this.prefabs.background.update(time, delta);
  }
}
