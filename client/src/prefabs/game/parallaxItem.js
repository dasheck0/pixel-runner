import { times } from 'lodash';
import Base from '../base/object';
import Sprite from '../base/sprite';


export default class ParallaxItem extends Base {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    this.movementSpeed = options.movementSpeed || 50;
    this.isMoving = false;
    this.items = times(3, (i) => {
      const sprite = new Sprite(`parallax_item_${name}_${i}`, scene, {
        key: options.key,
        position: {
          x: 0.5,
          y: 0.5,
          relative: true
        },
        anchor: {
          x: 0.5,
          y: 0.5
        },
        group: options.group
      });

      sprite.x += (i - 1) * sprite.displayWidth;
      sprite.y += (options.offset || {}).y || 0;
      scene.physics.world.enable(sprite);

      return sprite;
    });
  }

  start() {
    if (!this.isMoving) {
      this.isMoving = true;
      this.items.forEach((item) => {
        this.scene.physics.moveTo(item, -item.displayWidth, item.y, this.movementSpeed);
      });
    }
  }

  stop() {
    if (this.isMoving) {
      this.isMoving = false;
      this.items.forEach((item) => {
        item.setVelocity(0);
      });
    }
  }

  update(time, delta) {
    if(this.isMoving) {
      this.items.forEach((item, index) => {
        if(item.x <= -item.displayWidth / 2) {
          item.x += this.items.length * item.displayWidth;
        }
      })
    }
  }
}
