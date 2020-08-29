export default class Api {
  static get baseUrl() {
    return 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
  }

  static get gameId() {
    return 'OZBsTg9qC5go43D8PLU6';
  }

  static getBoard() {
    return Api.fetchData(`${Api.baseUrl}/${Api.gameId}/scores`).then(res => res);
  }

  static addScore() {
    return Api.fetchData(`${Api.baseUrl}/${Api.gameId}/scores`, 'POST', {
      user: window.localStorage.getItem('name') || 'No one',
      score: window.localStorage.getItem('score') || 0,
    }).then(res => res);
  }

  static async fetchData(url = '', method = 'GET', data = {}) {
    const options = {
      method,
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (method === 'POST') {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    return response.json();
  }
}
