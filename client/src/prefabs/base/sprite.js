import 'phaser';

export default class extends Phaser.Physics.Arcade.Sprite {
  constructor(name, scene, options, envs) {
    super(scene, options.position.x, options.position.y);

    this.name = name;
    this.scene = scene;
    this.options = options;
    this.envs = envs;

    this.setTexture(options.key);

    if (options.position.relative) {
      const x = scene.scene.manager.game.config.width * options.position.x;
      const y = scene.scene.manager.game.config.height * options.position.y;

      this.setPosition(x, y);
    }

    if (options.anchor) {
      this.setOrigin(options.anchor.x, options.anchor.y);
    }

    if (options.scale) {
      this.setScale(options.scale.x, options.scale.y);
    }

    if (options.angle) {
      this.angle = options.angle;
    }

    if (options.alpha || options.alpha === 0) {
      this.alpha = options.alpha;
    }

    scene.add.existing(this);

    this.group = scene.groups[options.group];

    if (this.group) {
      this.group.add(this);
      this.depth = this.group._zIndex;
    }
  }

  destroy() {
    if (this.scene && this.scene.prefabs) {
      delete this.scene.prefabs[this.name];
    }
    super.destroy();
  }
}
