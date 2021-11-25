import axios from "axios";

const BASE_API_URL = "https://api.github.com/search/";

export const githubSearchApi = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        Accept: "application/vnd.github.v3+json",
    },
});
