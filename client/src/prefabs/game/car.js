import Sprite from '../base/sprite';

export default class Car extends Sprite {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    this.movementTween = this.scene.tweens.add({
      targets: this,
      scaleY: 1.05,
      duration: 50,
      repeat: -1,
      yoyo: true,
      paused: true
    });
  }

  start() {
    if (this.movementTween) {
      this.movementTween.resume();
    }
  }

  stop() {
    if (this.movementTween) {
      this.movementTween.pause();
    }
  }
}
