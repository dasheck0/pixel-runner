import Base from '../../base/object';

export default class Background extends Base {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    this.graphics = scene.add.graphics(0, 0);
    this.animationDuration = 3000;
    this.color0 = options.color0 || (new Phaser.Display.Color().random(100, 200).color);
    const color = Phaser.Display.Color.ValueToColor(this.color0).lighten(5);
    this.color1 = Phaser.Display.Color.GetColor(color.red, color.green, color.blue);

    this.xOffset = 0;
    this.maxOffset = 50;
  }

  update(time, delta) {
    if (this.scene.prefabs && this.scene.prefabs.player) {
      this.xOffset = ((this.scene.prefabs.player.x / this.envs.width) - 0.5) * this.maxOffset;
      this.graphics.setPosition(this.xOffset, 0);
    }
  }

  _mod(value, mod) {
    return ((value % mod) + mod) % mod;
  }
}
