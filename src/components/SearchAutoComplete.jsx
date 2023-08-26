import { useState, useEffect } from "react";

import { fetchData } from "../services/finnHub";

const SearchAutoComplete = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchInput, setSearchInput] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("searchInput", searchInput);
        setSearchResult([]);
        if (searchInput.length === 0) return;

        try {
            setIsLoading(true);
            const params = {
                q: searchInput,
            };
            const res = await fetchData("/search", params);

            setSearchResult(res.data.result);
            console.log(searchResult);
            setIsLoading(false);
        } catch (error) {
            //todo
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(searchResult);
    });

    return (
        <div className="w-50 p-5 mx-auto">
            <form className="form-floating dropdown" onSubmit={handleSubmit}>
                <input
                    style={{ backgroundColor: "rgba/145, 158, 171, 0.04" }}
                    id="search"
                    type="text"
                    placeholder="Search"
                    autoComplete="off"
                    className="form-control"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <label htmlFor="search">Search</label>
            </form>

            {isLoading && <p>Loading...</p>}
            <ul
                className={`dropdown-menu ${
                    searchResult.length > 0
                        ? "show list-group list-group-flush"
                        : ""
                }`}
            >
                {searchResult &&
                    searchResult.map(({ symbol }) => {
                        return (
                            <li className="list-group-item" key={symbol}>
                                {symbol}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default SearchAutoComplete;
