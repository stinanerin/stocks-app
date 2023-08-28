import { createContext, useEffect, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
    const [watchList, setWatchList] = useState(
        localStorage.getItem("watchList")?.split(",") || [
            "GOOGL",
            "MSFT",
            "AMZN",
        ]
    );

    useEffect(() => {
        localStorage.setItem("watchList", watchList);
    }, [watchList]);

    const addStock = (stock) => {
        if (watchList.indexOf(stock) === -1) {
            setWatchList([...watchList, stock]);
        }
    };

    const deleteStock = (stock) => {
        const filteredWatchList = watchList.filter((el) => {
            return el !== stock;
        });
        setWatchList(filteredWatchList);
    };

    return (
        <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>
            {
                // Instructs context provider to render all children element props
            }
            {props.children}
        </WatchListContext.Provider>
    );
};
