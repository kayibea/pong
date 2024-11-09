import Vec2 from 'utils/Vector2';
import Entity from 'entities/Entity';

export default class Ball extends Entity {
  public static readonly BALL_WIDTH = 15;
  public static readonly BALL_HEIGHT = 15;
  public static readonly BALL_SPEED_X = 5;
  public static readonly BALL_SPEED_Y = 3;

  constructor(size: [number, number], pos = Vec2.zero, velocity = new Vec2(Ball.BALL_SPEED_X, Ball.BALL_SPEED_Y)) {
    super(size, pos, velocity);
  }
}