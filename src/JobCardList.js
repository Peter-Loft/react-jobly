import React from "react";
import JobCard from "./JobCard";

/**
 * Displays list of all jobs
 * 
 * Props - [listOfJobs]
 * 
 * State - None
 * 
 * JobList, CompanyDetail --> JobCardList --> JobCard
 */

function JobCardList() {
    return (
        <div>
            <p>All Job List</p>
            <ul>
                <li><JobCard /></li>
                <li><JobCard /></li>
            </ul>
        </div>
    )
}

export default JobCardList;