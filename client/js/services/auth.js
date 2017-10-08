import jwt_decode from 'jwt-decode';

export const setToken = token => {
    localStorage.setItem("jwtToken", token);
}

export const removeToken = () => {
    localStorage.setItem("jwtToken", "");
}

export const getUser = () => {
    if(localStorage.jwtToken) {
        return jwt_decode(localStorage.jwtToken);
    }
    return {};
}