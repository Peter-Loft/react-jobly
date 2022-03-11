import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";
import { Link } from "react-router-dom";
import JoblyApi from "./api";

/**
 * Displays list of all companies
 * 
 * Props - None
 * 
 * State - [listOfCompanies]
 * 
 * Routes --> CompanyList --> [SearchForm, CompanyCard]
 */

function CompanyList() {

  console.log("CompanyList rendered");

  const [companies, setCompanies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function fetchCompaniesWhenMounted() {
    async function _fetchCompanies() {
      const result = await JoblyApi.getCompanies();
      setCompanies(result);
      setIsLoading(false);
    }
    _fetchCompanies();
  }, []);

  function handleSubmit(term) {
    async function _fetchCompanies() {
      const result = await JoblyApi.companiesSearch(term);
      setCompanies(result);
    }
    _fetchCompanies();
  }

  if (isLoading) return <h1><i>Loading Companies...</i></h1>

  return (
      <div className="CompanyCardList">
        <SearchForm handleSubmit={handleSubmit} />
        {companies.length !== 0 &&
          <ul>
            {companies.map(comp => {
              return (
                <Link
                  to={`/companies/${comp.handle}`}
                  key={comp.handle} >
                  <li >
                    <CompanyCard company={comp} />
                  </li>
                </Link>)
            })
            }
          </ul>}
        {companies.length === 0 && <p>No Results Found...</p>}
      </div>
  );
}

export default CompanyList;