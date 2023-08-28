import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchData } from "../services/finnHub";
import { formatChartData } from "../utility/helpers";

const StockDetailPage = () => {
    const [chartdata, setCharData] = useState();
    const { symbol } = useParams();

    console.log(symbol);

    useEffect(() => {
        const today = new Date();
        const currentTimeStamp = Math.floor(today.getTime() / 1000);

        const TWENTY_FOUR_HOURS = 24 * 60 * 60;

        // --------- Time Intervals ---------
        // Day
        let oneDay;
        if (today.getDay() === 6) {
            // Saturday
            oneDay = currentTimeStamp - TWENTY_FOUR_HOURS * 2;
        } else if (today.getDay() === 0) {
            // Sunday
            oneDay = currentTimeStamp - TWENTY_FOUR_HOURS * 3;
        } else {
            oneDay = currentTimeStamp - TWENTY_FOUR_HOURS;
        }

        // Week
        const oneWeek = currentTimeStamp * TWENTY_FOUR_HOURS * 7;
        console.log(oneWeek);

        // Year
        const oneYear = currentTimeStamp * TWENTY_FOUR_HOURS * 365;

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

                setCharData({
                    day: formatChartData(responses[0].data),
                    //todo- somthign weird seems to happen on mondays --> no data

                    // week: formatChartData(responses[1].data),
                    year: formatChartData(responses[2].data),
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchDetailStock();
        // If selected stock changes --> update data
    }, [symbol]);

    return <div>Stock {symbol}</div>;
};

export default StockDetailPage;
