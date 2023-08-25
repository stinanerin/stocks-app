import axios from "axios";

import dotenv from "dotenv";
dotenv.config();
const TOKEN = process.env.TOKEN;

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN,
    },
});
