import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

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
