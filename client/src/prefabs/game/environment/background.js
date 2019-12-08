import Base from '../../base/object';

export default class Background extends Base {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    this.graphics = scene.add.graphics(0, 0);
    this.animationDuration = 3000;
    this.color0 = options.color0 || (new Phaser.Display.Color().random(100, 200).color);
    const color = Phaser.Display.Color.ValueToColor(this.color0).lighten(5);
    this.color1 = Phaser.Display.Color.GetColor(color.red, color.green, color.blue);
  }

  update(time, delta) {
  }
}
