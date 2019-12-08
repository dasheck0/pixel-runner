import Base from '../base/object';
import Sprite from '../base/sprite'

import ParallaxItem from './parallaxItem';

export default class Background extends Base {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    this.background = new Sprite(`${name}_background`, scene, {
      key: options.key,
      position: {
        x: 0.5,
        y: 0.5,
        relative: true
      },
      anchor: {
        x: 0.5,
        y: 0.5
      }
    });

    this.layers = (options.layers || []).map((layer, index) => {
      return new ParallaxItem(`${name}_layer_${index}`, scene, {
        key: layer.key,
        group: options.group,
        movementSpeed: layer.speed,
        offset: {
          y: layer.offset || 0
        }
      });
    });
  }

  start() {
    this.layers.forEach(layer => layer.start());
  }

  stop() {
    this.layers.forEach(layer => layer.stop());
  }

  update(time, delta) {
    (this.layers || []).forEach((layer) => {
      if (layer) {
        layer.update(time, delta);
      }
    });
  }
}
