import Vec2 from 'utils/Vector2';

export default abstract class Entity {
  protected _size: [number, number];
  protected _position: Vec2;
  protected _velocity: Vec2;

  constructor(size: [number, number], pos = Vec2.zero, velocity = Vec2.zero) {
    this._size = size;
    this._position = pos;
    this._velocity = velocity;
  }

  public get size(): [number, number] {
    return this._size;
  }

  public get width(): number {
    return this.size.at(0) || 0;
  }

  public get height(): number {
    return this.size.at(1) || 0;
  }

  public get position(): Vec2 {
    return this._position;
  }

  public get velocity(): Vec2 {
    return this._velocity;
  }

  public set position(pos: Vec2) {
    this.position.x = pos.x;
    this.position.y = pos.y;
  }

  public set velocity(vel: Vec2) {
    this._velocity.x = vel.x;
    this._velocity.y = vel.y;
  }
}
