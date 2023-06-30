class Api {
  constructor({basePath }) {
    this._basePath = basePath;
  }

  _getHeaders() {
    const token=localStorage.getItem("jwt");
    return {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    };
  }
  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getInitialCards() {
    const res = await fetch(`${this._basePath}/cards`, {
      headers: this._getHeaders(),
    });
    return this._getJson(res);
  }

  async getUserInfo() {
    const res = await fetch(`${this._basePath}/users/me`, {
      headers: this._getHeaders(),
    });
    return this._getJson(res);
  }

  async sendUserInfo(userData) {
    const res = await fetch(`${this._basePath}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(userData),
    });
    return this._getJson(res);
  }
  async sendCard(cardData) {
    const res = await fetch(`${this._basePath}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(cardData),
    });
    return this._getJson(res);
  }
  async deleteCard(id) {
    const res = await fetch(`${this._basePath}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    });
    return this._getJson(res);
  }
  async changeLike(cardID, isLiked) {
    if (!isLiked) {
      const res = await fetch(`${this._basePath}/cards/${cardID}/likes`, {
        method: "PUT",
        headers: this._getHeaders(),
      });
      return this._getJson(res);
    } else {
      const res = await fetch(`${this._basePath}/cards/${cardID}/likes`, {
        method: "DELETE",
        headers: this._getHeaders(),
      });
      return this._getJson(res);
    }
  }

  async sendAvatar(avatar) {
    const res = await fetch(`${this._basePath}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
    return this._getJson(res);
  }
}

const api = new Api({
  basePath: "http://localhost:3000",
});

export default api;
