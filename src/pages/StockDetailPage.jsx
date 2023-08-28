import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchData } from "../services/finnHub";
import { formatChartData } from "../utility/helpers";
import StockChart from "../components/StockChart";
import StockProfile from "../components/StockProfile";

const StockDetailPage = () => {
    const [chartData, setCharData] = useState();
    const { symbol } = useParams();

    useEffect(() => {
        const today = new Date();
        // Convert to seconds
        const currentTimeStamp = Math.floor(today.getTime() / 1000);

        // 24 hours in seconds
        const TWENTY_FOUR_HOURS = 24 * 60 * 60;

        // --------- Time Intervals ---------
        // Day
        let oneDay;
        if (today.getDay() === 6) {
            oneDay = currentTimeStamp - 2 * TWENTY_FOUR_HOURS;
        } else if (today.getDay() === 0) {
            oneDay = currentTimeStamp - 3 * TWENTY_FOUR_HOURS;
        } else {
            oneDay = currentTimeStamp - TWENTY_FOUR_HOURS;
        }

        // Week
        const oneWeek = currentTimeStamp - 7 * TWENTY_FOUR_HOURS;
        // Year
        const oneYear = currentTimeStamp - 365 * TWENTY_FOUR_HOURS;

        // console.log("start oneday", new Date(oneDay * 1000));
        // console.log("end", new Date(currentTimeStamp * 1000));

        const fetchDetailStock = async () => {
            try {
                const responses = await Promise.all([
                    fetchData("/stock/candle", {
                        symbol,
                        from: oneDay,
                        to: currentTimeStamp,
                        resolution: 30,
                    }),
                    fetchData("/stock/candle", {
                        symbol,
                        from: oneWeek,
                        to: currentTimeStamp,
                        resolution: 60,
                    }),
                    fetchData("/stock/candle", {
                        symbol,
                        from: oneYear,
                        to: currentTimeStamp,
                        resolution: "W",
                    }),
                ]);
                console.log("responses", responses);

                setCharData({
                    day: formatChartData(responses[0].data),
                    week: formatChartData(responses[1].data),
                    year: formatChartData(responses[2].data),
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchDetailStock();
        // If selected stock changes --> update data
    }, [symbol]);

    return (
        <div>
            {chartData && <StockChart data={chartData} symbol={symbol} />}
            <StockProfile symbol={symbol} />
        </div>
    );
};

export default StockDetailPage;
