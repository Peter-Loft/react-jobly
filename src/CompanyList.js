import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";
import axios from "axios";
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
    async function fetchCompanies() {
      const result = await JoblyApi.getCompanies();
      setCompanies(result);
      setIsLoading(false);
    }
    fetchCompanies();
  }, []);

  // Makes axios call to get list of company on render

  if (isLoading) return <h1><i>Loading Companies...</i></h1>

  
  //Map over state, display company card for each
  return (
    <div>
      <SearchForm />
      <p>All Company List</p>
      <ul className="CompanyCardList">
        {companies.map(comp => {
          return (
            <li key={comp.handle}>
              <CompanyCard company={comp} />
            </li>)
        })
        }
      </ul>
    </div>
  );
}

export default CompanyList;