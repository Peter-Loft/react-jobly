import React from "react";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";

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
  // Makes axios call to get list of company on render


  //Map over state, display company card for each
  return (
    <div>
      <SearchForm />
      <p>All Company List</p>
      <ul>
        <li><CompanyCard /></li>
        <li><CompanyCard /></li>
      </ul>
    </div>
  );
}

export default CompanyList;