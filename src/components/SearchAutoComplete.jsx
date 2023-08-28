import { useState, useEffect, useRef } from "react";

import { fetchData } from "../services/finnHub";

import SearchList from "./SearchList";

const SearchAutoComplete = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchInput, setSearchInput] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isResultsVisible, setIsResultsVisible] = useState(false);
    const searchContainerRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSearchResult([]);
        if (searchInput.trim() === "") return;

        try {
            setIsLoading(true);
            const params = {
                q: searchInput,
            };
            const res = await fetchData("/search", params);

            setSearchResult(res.data.result);
            setIsLoading(false);
            // Show results after fetching
            setIsResultsVisible(true);
        } catch (error) {
            //todo
            console.log(error);
        }
    };

    const handleDocumentClick = (e) => {
        const clickedElem = e.target;
        if (
            // Check if the click is inside the search container/ search input field or not
            searchContainerRef.current &&
            !searchContainerRef.current.contains(clickedElem) &&
            clickedElem !== document.getElementById("search") // Exclude the search input field
        ) {
            setIsResultsVisible(false); // Hide results if clicked outside
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

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
                    onClick={() => setIsResultsVisible(true)}
                />
                <label htmlFor="search">Search</label>
            </form>

            {isLoading && <p>Loading...</p>}

            <div ref={searchContainerRef}>
                {isResultsVisible && searchResult.length > 0 && (
                    <SearchList searchResult={searchResult} />
                )}
            </div>
        </div>
    );
};

export default SearchAutoComplete;
