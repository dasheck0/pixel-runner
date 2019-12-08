import Background from "./background";

export default class StripeBackground extends Background {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    this.rowCount = options.rowCount || 20;
    this.helperRowCount = Math.ceil(this.maxOffset / (this.envs.width / this.rowCount));
    this.columnCount = Math.ceil(this.envs.height / (this.envs.width / this.rowCount)) + 1;
    this.offset = 0;

    this.tween = this.scene.tweens.add({
      targets: this,
      props: {
        offset: { from: 0, to: (this.envs.width / this.rowCount) },
      },
      ease: 'Linear',
      duration: this.animationDuration,
      repeat: -1,
    });
  }

  draw() {
    this.graphics.clear();

    const rect = new Phaser.Geom.Rectangle(-this.maxOffset, 0, this.envs.width + 2 * this.maxOffset, this.envs.height);
    this.graphics.fillStyle(this.color0, 1);
    this.graphics.fillRectShape(rect);

    const step = this.envs.width / this.rowCount / 2;
    for (let i = 0; i < this.columnCount; i += 1) {
      this.graphics.beginPath();
      const currentHeight = i * 2 * step - this.offset + step;
      this.graphics.moveTo(-this.helperRowCount * (this.envs.width / (this.rowCount * 2)), currentHeight);

      for (let x = 1 - this.helperRowCount; x <= this.rowCount * 2 + this.helperRowCount; x += 1) {
        this.graphics.lineTo(x * (this.envs.width / (this.rowCount * 2)), currentHeight - ((this._mod(x, 2) === 0) ? 0 : step));
      }

      for (let x = this.rowCount * 2 + this.helperRowCount; x >= -this.helperRowCount; x -= 1) {
        this.graphics.lineTo(x * (this.envs.width / (this.rowCount * 2)), currentHeight - ((this._mod(x, 2) === 1) ? 0 : step) + step);
      }

      this.graphics.lineTo(-this.helperRowCount * (this.envs.width / (this.rowCount * 2)), currentHeight);

      this.graphics.closePath();

      this.graphics.fillStyle(this.color1, 1);
      this.graphics.fillPath();
    }
  }

  update(time, delta) {
    super.update(time, delta);

    this.draw();
  }


}
