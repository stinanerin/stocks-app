import { useState, useEffect, useContext } from "react";
import { finnHub } from "../services/finnHub";

import { useHistory } from "react-router-dom";

import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

// Not context provider component
import { WatchListContext } from "./context/WatchListContext";

const StockList = () => {
    const [stocks, setStock] = useState([]);
    const { watchList, deleteStock } = useContext(WatchListContext);

    const changeColor = (num) => (num < 0 ? "danger" : "success");
    const renderIcon = (num) =>
        num < 0 ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />;

    const history = useHistory();

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

        // Fetch data when watchList changes
    }, [watchList]);

    const handleSelectStock = (stock) => {
        history.push(`detail/${stock}`);
    };

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
                {stocks.map(({ stock, data: { c, d, dp, h, l, o, pc } }) => {
                    return (
                        <tr
                            onClick={() => handleSelectStock(stock)}
                            className="table-row"
                            key={stock}
                        >
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
                            <td>
                                <button
                                    onClick={(e) => {
                                        // Stops parent element(the row) onClick event being triggered
                                        e.stopPropagation();
                                        deleteStock(stock);
                                    }}
                                    className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default StockList;
