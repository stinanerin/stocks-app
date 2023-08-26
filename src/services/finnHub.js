import axios from "axios";

const TOKEN = process.env.REACT_APP_TOKEN || "no-token";

export const finnHub = axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN,
    },
});

export const fetchData = async (route, params) => {
    try {
        const res = await finnHub.get(route, { params });

        if (res.status !== 200) throw new Error();

        return res;
    } catch (error) {
        //todo
        console.log(error);
    }
};
