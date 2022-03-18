import * as Phaser from "phaser";

export class Player {
  public image: Phaser.Physics.Matter.Image;

  constructor(public scene: Phaser.Scene, public x: number, public y: number) {
    this.initPhysics(x, y);
  }

  private initPhysics(x: number, y: number) {
    this.image = this.scene.matter.add.image(x, y, "player");
    this.image.setBody(
      {},
      {
        torque: 10,
        force: new Phaser.Math.Vector2(0, -0.1),
        label: "player",
      }
    );
    this.image.setDisplaySize(64, 64);
  }

  public update() {
    const camera = this.scene.cameras.main;
    if (this.image.x < camera.scrollX) {
      this.image.x = camera.width;
    } else if (camera.scrollX + camera.width < this.image.x) {
      this.image.x = camera.scrollX;
    }
  }
}
