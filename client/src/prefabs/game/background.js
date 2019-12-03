import Base from '../base/object';
import Sprite from '../base/sprite'

import ParallaxItem from './parallaxItem';

export default class Background extends Base {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    this.background = new Sprite('background', scene, {
      key: 'background',
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

    this.layers = [];

    // [
    //   'clouds_BG',
    //   'mountains',
    //   'clouds_MG_3',
    //   'clouds_MG_2',
    //   'clouds_MG_1',
    // ].forEach((image) => {
    //   const sprite = new Sprite(image, scene, {
    //     key: image,
    //     position: {
    //       x: 0.5,
    //       y: 1,
    //       relative: true
    //     },
    //     anchor: {
    //       x: 0.5,
    //       y: 1
    //     }
    //   });

    const parallaxClouds = new ParallaxItem('clouds', scene, {
      key: 'clouds_BG',
      group: 'background',
      movementSpeed: 20,
      offset: {
        y: -20
      }
    });

    const parallaxMountain = new ParallaxItem('mountain', scene, {
      key: 'mountains',
      group: 'background',
      movementSpeed: 30,
      offset: {
        y: -20
      }
    });

    const parallaxClouds3 = new ParallaxItem('mountain', scene, {
      key: 'clouds_MG_3',
      group: 'background',
      movementSpeed: 40,
      offset: {
        y: -20
      }
    });

    const parallaxClouds2 = new ParallaxItem('mountain', scene, {
      key: 'clouds_MG_2',
      group: 'background',
      movementSpeed: 50,
      offset: {
        y: -20
      }
    });

    const parallaxClouds1 = new ParallaxItem('mountain', scene, {
      key: 'clouds_MG_1',
      group: 'background',
      movementSpeed: 60,
      offset: {
        y: -20
      }
    });

    this.layers.push(parallaxClouds);
    this.layers.push(parallaxMountain);
    this.layers.push(parallaxClouds3);
    this.layers.push(parallaxClouds2);
    this.layers.push(parallaxClouds1);
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
