import Vec2 from 'utils/Vector2';

export default abstract class Entity {
  protected _size: readonly [number, number];
  protected _position: Vec2;
  protected _velocity: Vec2;

  constructor(size: [number, number], pos = new Vec2(), velocity = new Vec2()) {
    this._size = size;
    this._position = pos;
    this._velocity = velocity;
  }

  public get size(): [number, number] {
    return [...this._size];
  }

  public get width(): number {
    return this._size[0];
  }

  public get height(): number {
    return this._size[1];
  }

  public get position(): Vec2 {
    return this._position;
  }

  public get velocity(): Vec2 {
    return this._velocity;
  }

  public set position(pos: Vec2) {
    this._position = new Vec2(pos.x, pos.y);
  }

  public set velocity(vel: Vec2) {
    this._velocity = new Vec2(vel.x, vel.y);
  }
}
