import React, { useState } from "react";


/** SearchForm
 * 
 * Props
 * handleSubmit- Fn passed down from rendering component
 * 
 * State
 * searchTerm- control component for form
 * 
 * CompanyList, JobList --> SearchForm
 */
function SearchForm({ handleSubmit }) {

    const [searchTerm, setSearchTerm] = useState("");

    function submitSearch(evt) {
        evt.preventDefault();
        handleSubmit(searchTerm);
    }

    function handleChange(evt) {
        const term = evt.target.value
        console.log("Term =", term);
        setSearchTerm(term);
    }

    console.log("Search Form rendered");
    return (
        <form>
            <label htmlFor="searchBar" />
            <input type="text"
                onChange={handleChange}
                id="searchBar"
                name="searchBar"
                value={searchTerm}>
            </input>
            <button onClick={submitSearch}>Submit</button>
        </form >
    )

}

export default SearchForm;