import React from "react";
import JobCard from "./JobCard";

/**
 * Displays list of all jobs
 * 
 * Props - {jobs}, a list of jobs
 * 
 * State - None
 * 
 * JobList, CompanyDetail --> JobCardList --> JobCard
 */

function JobCardList({ jobs }) {
    console.log("JobCardList Rendered");
    return (
            <ul className="JobCardList">
                {jobs.map(job => {
                    return (
                        <li key={job.id}>
                            <JobCard job={job} />
                        </li>
                    )
                })}

            </ul>
    )
}

export default JobCardList;