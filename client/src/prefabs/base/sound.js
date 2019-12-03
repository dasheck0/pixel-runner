import Base from './object';

export default class Sound extends Base {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    this.sound = this.scene.sound.add(options.key);

    if (options.autoPlay) {
      this.sound.play();
    }

    this.sound.setLoop(options.loop || false);
  }
}
