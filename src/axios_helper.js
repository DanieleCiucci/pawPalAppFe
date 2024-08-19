import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

axios.defaults.baseURL =apiUrl;
axios.defaults.headers.common['Content-Type'] = 'application/json';


export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthToken = (token) => {
    window.localStorage.setItem('auth_token', token);
}

export const request =(method, url, data) => {

    let headers = {};

    if(getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {"Authorization": `Bearer ${getAuthToken()}`};
    }

    return axios({
        method: method,
        headers: headers,
        url: url,
        data: data
    })
}