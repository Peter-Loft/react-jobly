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

    console.log("Search form rendering");

    const [searchTerm, setSearchTerm] = useState("");

    function handleChangeAndSubmit(evt) {
        evt.preventDefault();
        const term = evt.target.value
        setSearchTerm(term);
        handleSubmit(term);
    }

    // function submitSearch(evt) {
    //     evt.preventDefault();
    //     handleSubmit(searchTerm);
    //     setSearchTerm("");
    // }

    // function handleChange(evt) {
    //     const term = evt.target.value
    //     console.log("Term =", term);
    //     setSearchTerm(term);
    // }

    return (
        <form>
            <label htmlFor="searchBar" />
            <input type="text"
                onChange={handleChangeAndSubmit}
                id="searchBar"
                name="searchBar"
                value={searchTerm}>
            </input>
            {/* <button onClick={submitSearch}>Submit</button> */}
        </form >
    )

}

export default SearchForm;