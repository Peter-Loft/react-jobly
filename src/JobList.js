import React from "react";
import SearchForm from "./SearchForm";
import JobCardList from "./JobCardList";

/**
 * Handles logic for JobCardList
 * Handles search params and makes axios calls
 * 
 * Props - None
 * 
 * State - [listOfJobs]
 * 
 * Routes --> JobList --> [SearchForm, JobList]
 */

function JobList() {
    // Makes axios call to get list of company on render
    console.log("Job List Rendered");
    return (
        <div>
            <SearchForm />
            <JobCardList />
        </div>
    );
}
//JobCardList takes in state as props

export default JobList;