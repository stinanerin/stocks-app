import Chart from "react-apexcharts";

const StockChart = ({ data, symbol }) => {
    /* 
        data: [
            x: time,
            y: stockprice,
        ]
    */

    const { day, year } = data;
    console.log(day);
    const options = {
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
            data: day,
        },
    ];

    return (
        <div className="mt-5 p-4 shadow-sm bg-white">
            <Chart options={options} series={series} type="area" width="100%" />
        </div>
    );
};

export default StockChart;
