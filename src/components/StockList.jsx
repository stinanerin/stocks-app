import { useState, useEffect } from "react";
import finnHub from "../services/finnHub";

const StockList = () => {
    const [stock, setStock] = useState([]);
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const stocksReq = watchList.map((stock) => {
                    return finnHub.get("/quote", {
                        params: {
                            symbol: stock,
                        },
                    });
                });
                // Equals to --> "https://finnhub.io/api/v1/quote?token=cjjkhr1r01qirue6aoigcjjkhr1r01qirue6aoj0&symbol=MSFT"

                const response = await Promise.all(stocksReq);

                const stockData = response.map((stock) => {
                    return {
                        data: stock.data,
                        stock: stock.config.params.symbol,
                    };
                });

                console.log("stockData", stockData);
                if (isMounted) {
                    setStock(stockData);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        // As to not call setStock on unmounted component
        return () => {
            isMounted = false;
        };

        // Only fetch data when the component mounts
    }, []);

    return <div>StockList</div>;
};

export default StockList;
