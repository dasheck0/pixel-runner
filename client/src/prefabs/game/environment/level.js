import { times } from 'lodash';

import Base from '../../base/object'

export default class Level extends Base {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    const type = 1;
    const size = 16;

    const width = Math.trunc(this.envs.width / size);
    const height = Math.trunc(this.envs.height / size);

    this.map = this.scene.make.tilemap({
      width,
      height,
      tileWidth: size,
      tileHeight: size
    });

    console.log("HEfkdj", width, height);

    const tileset = this.map.addTilesetImage('terrain', 'terrain', size, size);
    const data = times(height, (yIndex) => times(width, (xIndex) => {
      if (xIndex === 0 && yIndex === 0) {
        return (tileset.columns * type * 4) + 3;
      }

      if (xIndex === width - 1 && yIndex === 0) {
        return (tileset.columns * type * 4) + 4;
      }

      if (xIndex === 0 && yIndex === height - 1) {
        return (tileset.columns * type * 4) + tileset.columns * 1 + 3;
      }

      if (xIndex === width - 1 && yIndex === height - 1) {
        return (tileset.columns * type * 4) + tileset.columns * 1 + 4;
      }

      if (xIndex === 0) {
        return (tileset.columns * type * 4) + tileset.columns * 1 + 2;
      }

      if (xIndex === width - 1) {
        return (tileset.columns * type * 4) + tileset.columns * 1;
      }

      if (yIndex === 0) {
        return (tileset.columns * type * 4) + tileset.columns * 2 + 1;
      }

      if (yIndex === height - 1) {
        return (tileset.columns * type * 4) + 1;
      }

      return -1;
    }));

    this.backgroundLayer = this.map.createBlankDynamicLayer('background', tileset, 0, 0, width, height);
    this.backgroundLayer.setDepth(1);
    this.backgroundLayer.putTilesAt(data, 0, 0);
  }
}
