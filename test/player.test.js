import Player from '../src/objects/Player';

test('Player has X and Y velocity', () => {
  expect(Player.xVelocity).toBe(300);
  expect(Player.yVelocity).toBe(800);
});
