import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('reacthooks');

  function handleSearch(event) {
    const { target: { value } } = event;
    setQuery(value);
  }

  function handleSubmit() {
    getNews();
  }

  async function getNews() {
   const results = await axios
    .get(`https://hn.algolia.com/api/v1/search?query=${query}`)
    setResults(results.data.hits);
  }

  useEffect(() => {
    getNews();
  }, []);

  return(
    <>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Search for news"
          onChange={handleSearch}
        />
        <button onClick={handleSubmit}>
            Search
        </button>
        <div>
          <ul>
            {results.map(result => (
              <li key={result.objectID}>
                {result.title}
              </li>
              )
            )}
          </ul>
        </div>
      </form>
    </>
  );
}