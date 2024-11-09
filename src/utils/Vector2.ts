export default class Vec2 {
  public static readonly zero = new Vec2(0, 0);

  protected _x: number;
  protected _y: number;

  constructor(x = 0, y = 0) {
    this._x = x;
    this._y = y;
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public set x(x: number) {
    this._x = x;
  }

  public set y(y: number) {
    this._y = y;
  }

  public setXY(x: number, y: number) {
    this._x = x;
    this._y = y;
  }
}
