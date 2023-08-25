import { useState, useEffect } from "react";
import finnHub from "../services/finnHub";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const StockList = () => {
    const [stock, setStock] = useState([]);
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

    const changeColor = (num) => (num < 0 ? "danger" : "success");
    const renderIcon = (num) =>
        num < 0 ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />;

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

    return (
        <table className="table hover mt-5">
            <thead style={{ color: "rgb(79,89,102)" }}>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Chg</th>
                    <th scope="col">Chg%</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">Pclose</th>
                </tr>
            </thead>
            <tbody>
                {stock.map(({ stock, data: { c, d, dp, h, l, o, pc } }) => {
                    return (
                        <tr className="table-row" key={stock}>
                            <th>{stock}</th>
                            <td>{c}</td>
                            <td className={`text-${changeColor(d)}`}>
                                {d} {renderIcon(d)}
                            </td>
                            <td className={`text-${changeColor(dp)}`}>
                                {dp} {renderIcon(dp)}
                            </td>
                            <td>{h}</td>
                            <td>{l}</td>
                            <td>{o}</td>
                            <td>{pc}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default StockList;
