import axios from "axios";

let api = axios.create({
    baseURL: "http://local.laravel.com/",
    headers: {
        "Content-type": "application/json"
    }
});

export const withToken = () => {
    const token = localStorage.token;
    if (token) {
        api = axios.create({
            baseURL: "http://local.laravel.com/",
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });
        return api;
    }
    return api;
}

export const multipartFormData = () => {
    let api = axios.create({
        baseURL: "http://local.laravel.com/",
        headers: {
            "Content-type": "multipart/form-data"
        }
    });
    return api;
}

export default api;