import { useContext } from "react";

// Not context provider component
import { WatchListContext } from "./context/WatchListContext";

const SearchList = ({ searchResult }) => {
    const { addStock } = useContext(WatchListContext);

    //todo stylign

    return (
        <ul className="dropdown-menu show list-group list-group-flush">
            {searchResult.map(({ symbol, description }) => {
                return (
                    <li
                        onClick={() => addStock(symbol)}
                        className="list-group-item"
                        key={symbol}
                    >
                        {symbol}, {description}
                    </li>
                );
            })}
        </ul>
    );
};

export default SearchList;
