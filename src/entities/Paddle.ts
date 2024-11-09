import Vec2 from 'utils/Vector2';
import Entity from 'entities/Entity';

export default class Paddle extends Entity {
  public static readonly PADDLE_WIDTH = 30;
  public static readonly PADDLE_HEIGHT = 100;
  public static readonly PADDLE_SPEED_X = 0;
  public static readonly PADDLE_SPEED_Y = 5;

  constructor(
    size: [number, number],
    pos = new Vec2(0, 0),
    velocity = new Vec2(Paddle.PADDLE_SPEED_X, Paddle.PADDLE_SPEED_Y),
  ) {
    super(size, pos, velocity);
  }
}
