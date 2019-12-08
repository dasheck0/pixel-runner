import { times, sample, flattenDeep } from 'lodash';

import Base from '../../base/object'

export default class Level extends Base {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    const type = 1;
    const size = 16;

    this.width = Math.trunc(this.envs.width / size);
    this.height = Math.trunc(this.envs.height / size);

    this.map = this.scene.make.tilemap({
      width: this.width,
      height: this.height,
      tileWidth: size,
      tileHeight: size
    });

    this.tileset = this.map.addTilesetImage('terrain', 'terrain', size, size);
    const data = times(this.height, (yIndex) => times(this.width, (xIndex) => {
      if (xIndex === 0 && yIndex === 0) {
        return (this.tileset.columns * type * 4) + 3;
      }

      if (xIndex === this.width - 1 && yIndex === 0) {
        return (this.tileset.columns * type * 4) + 4;
      }

      if (xIndex === 0 && yIndex === this.height - 1) {
        return (this.tileset.columns * type * 4) + this.tileset.columns * 1 + 3;
      }

      if (xIndex === this.width - 1 && yIndex === this.height - 1) {
        return (this.tileset.columns * type * 4) + this.tileset.columns * 1 + 4;
      }

      if (xIndex === 0) {
        return (this.tileset.columns * type * 4) + this.tileset.columns * 1 + 2;
      }

      if (xIndex === this.width - 1) {
        return (this.tileset.columns * type * 4) + this.tileset.columns * 1;
      }

      if (yIndex === 0) {
        return (this.tileset.columns * type * 4) + this.tileset.columns * 2 + 1;
      }

      if (yIndex === this.height - 1) {
        return (this.tileset.columns * type * 4) + 1;
      }

      return -1;
    }));

    this.backgroundLayer = this.map.createBlankDynamicLayer('background', this.tileset, 0, 0, this.width, this.height);
    this.backgroundLayer.setDepth(1);
    this.backgroundLayer.putTilesAt(data, 0, 0);

    this.backgroundLayer.getTilesWithin(0, 0, this.width, this.height).forEach((tile, index) => {
      const blocked = index < this.width || index >= this.width * (this.height - 1) || (index % this.width === 0) || (index % this.width === (this.width - 1));

      tile.properties.blocked = blocked;
      tile.properties.unblocked = !blocked;

      if (blocked) {
        tile.setCollision(true, true, true, true, this.backgroundLayer);
      }
    });

    times(10, () => this.addRandomBlock(null, 2));
  }

  addRandomBlock(blockType, textureType) {
    this.addBlock(Phaser.Math.Between(1, this.width - 1), Phaser.Math.Between(5, this.height - 1), blockType, textureType);
  }

  addBlock(x, y, blockType, textureType = 0) {
    const formations = [[1, 1, 12 + this.tileset.columns * 1], [1, 3, 15], [3, 1, 12], [2, 2, 13 + this.tileset.columns * 1]];
    const formation = formations[blockType] || sample(formations);

    const positions = [{
      x,
      y,
      data: formation[2] + this.tileset.columns * 4 * textureType
    }];

    for (let xi = 0; xi < formation[0]; xi += 1) {
      for (let yi = 0; yi < formation[1]; yi += 1) {
        positions.push({
          x: x + xi,
          y: y + yi,
          data: formation[2] + xi + this.tileset.columns * yi + this.tileset.columns * 4 * textureType
        });
      }
    }

    this._addBlock(positions)
  }

  _addBlock(positions) {
    positions.forEach((position) => {
      if (position.x > 0 && position.x < this.width && position.y > 0 && position.y < this.height) {
        let tile = this.backgroundLayer.getTileAt(position.x, position.y);
        if (!tile || tile.unblocked) {
          tile = this.backgroundLayer.putTileAt(position.data, position.x, position.y);
          tile.setCollision(true, true, true, true);
        }
      }
    })
  }
}
