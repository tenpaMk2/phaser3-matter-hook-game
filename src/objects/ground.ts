import * as Phaser from "phaser";

export class Ground {
  public image: Phaser.Physics.Matter.Image;

  constructor(public scene: Phaser.Scene) {
    const width = scene.scale.width;
    const height = scene.scale.height / 20;
    this.initPhysics(width / 2, 0, width, height);
  }

  private initPhysics(x: number, y: number, width: number, height: number) {
    this.image = this.scene.matter.add.image(x, y, "platform");
    this.image.setBody(
      {},
      {
        isStatic: true,
        label: "platform",
      }
    );
    this.image.setDisplaySize(width, height);
  }
}
