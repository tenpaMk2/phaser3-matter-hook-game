import * as Phaser from "phaser";

export class Platform {
  public image: Phaser.Physics.Matter.Image;
  public isDead: boolean = false;

  constructor(
    public scene: Phaser.Scene,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    this.initPhysics(x, y, width, height);
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

  public die() {
    this.image.destroy();
    this.isDead = true;
  }

  public update() {
    const camera = this.scene.cameras.main;
    if (camera.scrollY + camera.displayHeight < this.image.y) {
      this.die();
    }
  }
}
