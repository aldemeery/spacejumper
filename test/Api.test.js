import fetchMock from 'fetch-mock';
import Api from '../src/utils/Api';

describe('Api', () => {
  fetchMock.get(`${Api.baseUrl}/${Api.gameId}/scores`, {
    result: [
      {
        user: 'John Doe',
        score: 42,
      },
      {
        user: 'Peter Parker',
        score: 35,
      },
      {
        user: 'Wonder Woman',
        score: 50,
      },
    ],
  });

  fetchMock.post(`${Api.baseUrl}/${Api.gameId}/scores`, {
    result: 'Leaderboard score created correctly.',
  });

  it('Gets the leaderboard', async () => {
    const res = await Api.getBoard();
    expect(res).toEqual({
      result: [
        {
          user: 'John Doe',
          score: 42,
        },
        {
          user: 'Peter Parker',
          score: 35,
        },
        {
          user: 'Wonder Woman',
          score: 50,
        },
      ],
    });
  });

  it('Adds score to leaderboard.', async () => {
    const res = await Api.addScore();
    expect(res).toEqual({
      result: 'Leaderboard score created correctly.',
    });
  });
});
