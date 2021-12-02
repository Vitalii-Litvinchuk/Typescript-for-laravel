import axios from "axios";

export default axios.create({
    baseURL: "http://local.laravel.com/",
    headers: {
        "Content-type": "application/json"
    }
});