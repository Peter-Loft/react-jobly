import React from "react";

/**
 * Single job card, displays job details
 * 
 * Props - { job }
 * 
 * State - None
 * 
 * JobCardList --> JobCard
 */

function JobCard({ job }) {

    return (
        <div>
            <h3> {job.title} </h3>
            {job.companyName && <h4>{job.companyName}</h4>}
            <p>Salary: ${job.salary.toLocaleString()}</p>
            <p>Equity: {job.equity}</p>
            
        </div>
    );
}

export default JobCard;