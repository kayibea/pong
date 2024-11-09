export default class Vec2 {
  constructor(public x = 0, public y = 0) {}

  public setXY(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
