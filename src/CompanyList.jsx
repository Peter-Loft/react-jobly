import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import CompanyCard from "./CompanyCard";
import JoblyApi from "./api";
import useSearchResults from "./useSearchResults";

const searchCompanies = term => JoblyApi.companiesSearch(term);

function CompanyList() {
  const { results: companies, isLoading, error, handleSubmit } = useSearchResults(searchCompanies);
  return (
    <section>
      <h1>Explore companies</h1>
      <SearchForm handleSubmit={handleSubmit} label="Search companies by name" />
      {isLoading ? <p role="status">Loading companies...</p> :
        error ? <p role="alert">{error}</p> :
          companies.length ? (
            <ul>
              {companies.map(company => (
                <li key={company.handle}>
                  <Link to={`/companies/${encodeURIComponent(company.handle)}`}>
                    <CompanyCard company={company} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : <p>No companies found.</p>}
    </section>
  );
}

export default CompanyList;
