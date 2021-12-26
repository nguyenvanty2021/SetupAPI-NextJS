class TokenService {
  getLocalRefreshToken() {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      const user = JSON.parse(userLocal);
      return user?.refreshToken;
    }
  }

  getLocalAccessToken() {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      const user = JSON.parse(userLocal);
      return user?.accessToken;
    }
  }

  updateLocalAccessToken(token: any) {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      let user = JSON.parse(userLocal);
      user.accessToken = token;
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  getUser() {
    const userLocal = localStorage.getItem("user");
    if (userLocal) {
      return JSON.parse(userLocal);
    }
  }

  setUser(user: any) {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }
}

export default new TokenService();
