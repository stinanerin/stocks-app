import axios from "axios";

// "https://finnhub.io/api/v1/quote?symbol=AAPL&token=cjjkhr1r01qirue6aoigcjjkhr1r01qirue6aoj0";

import dotenv from "dotenv";
dotenv.config();
const TOKEN = process.env.TOKEN;

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN,
    },
});
