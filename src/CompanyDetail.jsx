import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobCardList from "./JobCardList";
import JoblyApi from "./api";

function CompanyDetail() {
  const { company } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError("");
    async function load() {
      try {
        const result = await JoblyApi.getCompany(company);
        if (active) setDetails(result);
      } catch (error) {
        if (active) setError(error.message || "Unable to load this company.");
      } finally {
        if (active) setIsLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [company, attempt]);

  if (isLoading) return <p role="status">Loading company...</p>;
  if (error) return <div><p role="alert">{error}</p><button onClick={() => setAttempt(value => value + 1)}>Try again</button></div>;

  return (
    <section>
      <h1>{details.name}</h1>
      <p>{details.description}</p>
      {details.jobs.length ? <JobCardList jobs={details.jobs} /> : <p>No open jobs at this company.</p>}
    </section>
  );
}

export default CompanyDetail;
