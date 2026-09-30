import React from "react";
import SearchForm from "./SearchForm";
import JobCardList from "./JobCardList";
import JoblyApi from "./api";
import useSearchResults from "./useSearchResults";

const searchJobs = term => JoblyApi.jobsSearch(term);

function JobList() {
  const { results: jobs, isLoading, error, handleSubmit } = useSearchResults(searchJobs);
  return (
    <section>
      <h1>Find a job</h1>
      <SearchForm handleSubmit={handleSubmit} label="Search jobs by title" />
      {isLoading ? <p role="status">Loading jobs...</p> :
        error ? <p role="alert">{error}</p> :
          jobs.length ? <JobCardList jobs={jobs} /> : <p>No jobs found.</p>}
    </section>
  );
}

export default JobList;
