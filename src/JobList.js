import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import JobCardList from "./JobCardList";
import JoblyApi from "./api";

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

    const [jobs, setJobs] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function fetchJobsWhenMounted() {
        async function _fetchJobs() {
            const result = await JoblyApi.getJobs();
            setJobs(result);
            setIsLoading(false);
        }
        _fetchJobs();
    }, []);

    function handleSubmit(term) {
        async function _fetchJobs() {
            const result = await JoblyApi.jobsSearch(term);
            setJobs(result);
        }
        _fetchJobs();
    }

    if (isLoading) return <h1><i>Loading Jobs...</i></h1>

    return (
        <div>
            <SearchForm handleSubmit={handleSubmit} />
            <JobCardList jobs={jobs} />
        </div>
    );
}
//JobCardList takes in state as props

export default JobList;