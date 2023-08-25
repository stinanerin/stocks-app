import axios from "axios";

const TOKEN = process.env.REACT_APP_TOKEN || "no-token";

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN,
    },
});
