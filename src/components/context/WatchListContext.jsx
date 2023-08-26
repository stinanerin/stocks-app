import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

    return (
        <WatchListContext.Provider value={{ watchList }}>
            {
                // Instructs context provider to render all children props
            }
            {props.children}
        </WatchListContext.Provider>
    );
};
