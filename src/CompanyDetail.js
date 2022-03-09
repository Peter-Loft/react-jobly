import React from "react";
import JobCardList from "./JobCardList";

/**
 * Displays single company and its jobs
 * 
 * Props - None
 * 
 * State - [listOfJobs]
 * 
 * Routes --> CompanyDetail --> [SearchForm, JobCardList]
 */

function CompanyDetail() {

    //UseParams to grab company handle from URL
    // Makes axios call to get single company

    return (
        <div>
            <p>Company Name</p>
            <JobCardList />
        </div>
    );
}

export default CompanyDetail;