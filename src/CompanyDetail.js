import React, { useEffect, useState } from "react";
import JobCardList from "./JobCardList";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";

/**
 * Displays single company and its jobs
 * 
 * Props - None
 * 
 * State - [fullCompanyDetails]
 * 
 * Routes --> CompanyDetail --> [SearchForm, JobCardList]
 */

function CompanyDetail() {
    console.log("CompanyDetail Rendered");

    const params = useParams(); //company handle

    const [companyDetails, setCompanyDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(function fetchCompanyWhenMounted() {
        async function fetchCompany() {
            const result = await JoblyApi.getCompany(params.company);
            setCompanyDetails(result);
            setIsLoading(false);
        }
        fetchCompany();
    }, []);

    if (isLoading) return <h1><i>Loading Companies...</i></h1>

    return (
        <div>
            <h1>{companyDetails.name}</h1>
            <i>{companyDetails.description}</i>
            <JobCardList jobs={companyDetails.jobs} />
        </div>
    );
}

export default CompanyDetail;