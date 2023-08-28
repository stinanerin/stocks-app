import { useState, useEffect } from "react";

import { fetchData } from "../services/finnHub";

const StockProfile = ({ symbol }) => {
    const [stockData, setStockData] = useState();

    useEffect(() => {
        console.log("hej");

        let isMounted = true;
        const fetchStockProfile = async () => {
            try {
                const res = await fetchData("/stock/profile2", {
                    symbol,
                });
                console.log(res);

                if (isMounted) setStockData(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchStockProfile();
        return () => (isMounted = false);
    }, [symbol]);

    return (
        <div>
            {console.log("stockData", stockData)}
            {stockData && (
                <div className="row border bg-white rounded shadow-sm p-4 mt-5">
                    <div className="col">
                        <div>
                            <span className="fw-bold">name: </span>
                            {stockData.name}
                        </div>
                        <div>
                            <span className="fw-bold">country: </span>
                            {stockData.country}
                        </div>
                        <div>
                            <span className="fw-bold">ticker: </span>
                            {stockData.ticker}
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <span className="fw-bold">Exchange: </span>
                            {stockData.exchange}
                        </div>
                        <div>
                            <span className="fw-bold">Industry: </span>
                            {stockData.finnhubIndustry}
                        </div>
                        <div>
                            <span className="fw-bold">IPO: </span>
                            {stockData.ipo}
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <span className="fw-bold">MarketCap: </span>
                            {stockData.marketCapitalization}
                        </div>
                        <div>
                            <span className="fw-bold">
                                Shares Outstanding:{" "}
                            </span>
                            {stockData.shareOutstanding}
                        </div>
                        <div>
                            <span className="fw-bold">url: </span>
                            <a href={stockData.weburl}>{stockData.weburl}</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockProfile;
