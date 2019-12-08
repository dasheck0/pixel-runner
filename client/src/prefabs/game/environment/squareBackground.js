import Background from "./background";

export default class SquareBackground extends Background {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    this.rowCount = options.rowCount || 16;
    this.helperRowCount = Math.ceil(this.maxOffset / (this.envs.width / this.rowCount));
    this.columnCount = Math.ceil(this.envs.height / (this.envs.width / this.rowCount));
    this.offset = 0;

    this.tween = this.scene.tweens.add({
      targets: this,
      props: {
        offset: { from: 0, to: 2 * this.envs.height / this.columnCount },
      },
      ease: 'Linear',
      duration: this.animationDuration * 2,
      repeat: -1,
    });
  }

  draw() {
    this.graphics.clear();

    for (let y = 0; y <= this.columnCount + 1; y += 1) {
      for (let x = -this.helperRowCount; x < this.rowCount + this.helperRowCount; x += 1) {
        const rect = new Phaser.Geom.Rectangle(x * this.envs.width / this.rowCount, y * this.envs.height / this.columnCount - this.offset, this.envs.width / this.rowCount, this.envs.width / this.rowCount);
        const color = (x + y) % 2 === 0 ? this.color0 : this.color1;

        this.graphics.fillStyle(color, 1);
        this.graphics.fillRectShape(rect)
      }
    }
  }
}
