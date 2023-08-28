import Chart from "react-apexcharts";

import { useState } from "react";
import { determineActiveBtn } from "../utility/helpers";

const StockChart = ({ data, symbol }) => {
    const [dateFormat, setDateFormat] = useState("24h");
    /* 
        data: [
            x: [time(ms)],
            y: [stockprice],
        ]
    */

    const { day, week, year } = data;
    console.log(day);

    const determineTimeFormat = () => {
        return dateFormat === "week"
            ? week
            : dateFormat === "year"
            ? year
            : day;
    };

    const color =
        determineTimeFormat()[determineTimeFormat().length - 1].y -
            determineTimeFormat()[0].y >
        0
            ? "#26C281"
            : "#ed3419";

    const options = {
        colors: [color],
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px",
            },
        },
        chart: {
            id: "stock-data",
            animations: {
                speed: 1300,
            },
        },
        xaxis: {
            type: "datetime",
            labels: {
                dateTimeUTC: false,
            },
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM",
            },
        },
    };

    const series = [
        {
            name: symbol,
            data: determineTimeFormat(),
        },
    ];

    return (
        <>
            <div className="mt-5 p-4 shadow-sm bg-white">
                <Chart
                    options={options}
                    series={series}
                    type="area"
                    width="100%"
                />
            </div>
            <div>
                <button
                    className={`btn ${determineActiveBtn(dateFormat, "24h")}`}
                    onClick={() => setDateFormat("24h")}
                >
                    24h
                </button>
                <button
                    className={`btn ${determineActiveBtn(dateFormat, "week")}`}
                    onClick={() => setDateFormat("week")}
                >
                    Week
                </button>
                <button
                    className={`btn ${determineActiveBtn(dateFormat, "year")}`}
                    onClick={() => setDateFormat("year")}
                >
                    year
                </button>
            </div>
        </>
    );
};

export default StockChart;
