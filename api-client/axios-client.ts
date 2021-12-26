import axios from "axios";
import tokenService from "./token-service";
// Hiện tại flow accessToken vs refreshToken nó chưa work -> tham khảo dự án typescript-saga ở github cũ để setup khúc này không dùng acessToken vs refreshToken
const axiosClient = axios.create({
  baseURL: "https://61c0248433f24c001782314a.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  (config) => {
    const token = tokenService.getLocalAccessToken();
    if (token) {
      if (config?.headers) {
        config.headers["x-access-token"] = token; // for Node.js Express back-end
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    const refreshToken = localStorage.get("refresh_token");
    // những chức năng khác (không phải chức năng login) -> vì những chức năng khác mới cần accessToken còn login thì không càn accessToken
    if (originalConfig.url !== "/auth/signin" && err.response) {
      // Access Token was expired
      if (
        err.response &&
        err.response.status === 401 &&
        originalConfig &&
        !originalConfig._retry &&
        refreshToken
      ) {
        originalConfig._retry = true;
        try {
          // gửi refreshToken để lấy 1 accessToken mới -> trường hợp refresherToken còn hạn
          const rs = await axiosClient.post("/auth/refreshtoken", {
            refreshToken: tokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;
          tokenService.updateLocalAccessToken(accessToken);

          return axiosClient(originalConfig);
          // hoặc
          // const response = fetch(api.refreshToken, {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     refresh: refreshToken,
          //   }),
          // })
          //   .then((res) => res.json())
          //   .then((res) => {
          //     localStorage.set(res.access, "token");

          //     return axios(originalRequest);
          //   });
          // resolve(response);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);
export default axiosClient;
