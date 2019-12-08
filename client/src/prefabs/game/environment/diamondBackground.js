import Background from "./background";

export default class StripeBackground extends Background {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    this.rowCount = 20;
    this.columnCount = Math.ceil(this.envs.height / (this.envs.width / this.rowCount)) + 1;
    this.offset = 0;

    this.tween = this.scene.tweens.add({
      targets: this,
      props: {
        offset: { from: 0, to:  (this.envs.width / this.rowCount) },
      },
      ease: 'Linear',
      duration: this.animationDuration,
      repeat: -1,
    });
  }

  draw() {
    this.graphics.clear();

    const rect = new Phaser.Geom.Rectangle(0, 0, this.envs.width, this.envs.height);
    this.graphics.fillStyle(this.color0, 1);
    this.graphics.fillRectShape(rect);

    const step = this.envs.width / this.rowCount / 2;
    for (let i = 0; i < this.columnCount; i += 1) {
      this.graphics.beginPath();
      const currentHeight = i * 2 * step - this.offset + step;
      this.graphics.moveTo(0, currentHeight);

      for (let x = 1; x <= this.rowCount * 2; x += 1) {
        this.graphics.lineTo(x * (this.envs.width / (this.rowCount * 2)), currentHeight - ((x % 2 === 0) ? 0 : step));
      }

      for (let x = this.rowCount * 2; x >= 0; x -= 1) {
        this.graphics.lineTo(x * (this.envs.width / (this.rowCount * 2)), currentHeight - ((x % 2 === 1) ? 0 : step) + step);
      }

      this.graphics.lineTo(0, currentHeight);

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
