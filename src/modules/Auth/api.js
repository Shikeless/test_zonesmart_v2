import axios from "axios";
import { load } from "../../localStorage";

export const fetchAuth = data => {
    return axios({
        method: "post",
        url: "http://utss.su/api/auth/jwt/create/",
        headers: {},
        data: {
            email: data.email,
            password: data.password.toString()
        }
    }).then(response => {
        return response.data;
    });
};

export const fetchVerifyToken = () => {
    return axios({
        method: "post",
        url: "http://utss.su/api/auth/jwt/verify/",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            token: load("access")
        }
    }).then(response => {
        return response.data;
    });
};

export const fetchRefreshToken = () => {
    return axios({
        method: "post",
        url: "http://utss.su/api/auth/jwt/refresh/",
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            refresh: load("refresh")
        }
    }).then(response => {
        return response.data;
    });
};
