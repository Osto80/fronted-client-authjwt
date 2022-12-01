import axios from "axios";
import TokenService from "./token.service";

// Interceptors för request och response:
const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: { "Content-Type" : "application/json" },
});

instance.interceptors.request.use( (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) { config.headers["Authorization"] = "Bearer " + token; }
    return config;
    }, (error) => {
    return Promise.reject(error);
});

instance.interceptors.response.use( (res) => {
     return res; 
    }, async (error) => {
        const originalConfig = error.config;
        if (originalConfig.url !== "/auth/signin" && error.response) {
            if (error.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const res = await instance.post("/auth/refreshtoken" , {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });

                    const { accessToken } = res.data;
                    TokenService.updateLocalAccessToken(accessToken);

                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(error);
    } 
);

export default instance;

