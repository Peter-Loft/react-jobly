import { useEffect, useState } from "react";

/** Ignore stale responses when the query changes or the page unmounts. */
export default function useSearchResults(search) {
  const [query, setQuery] = useState({ term: "", attempt: 0 });
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError("");
    async function load() {
      try {
        const data = await search(query.term);
        if (active) setResults(data);
      } catch (error) {
        if (active) setError(error.message || "Unable to load results. Please try again.");
      } finally {
        if (active) setIsLoading(false);
      }
    }
    load();
    return () => { active = false; };
  }, [query, search]);

  function handleSubmit(term) {
    setQuery(query => ({ term: term.trim(), attempt: query.attempt + 1 }));
  }

  return { results, isLoading, error, handleSubmit };
}
