import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('reacthooks');
  
  function handleSearch(event) {
    const { target: { value } } = event;
    setQuery(value);
  }

  useEffect(() => {
    axios
      .get(`https://hn.algolia.com/api/v1/search?query=${query}`)
      .then(respose => {
        console.log(respose.data);
        setResults(respose.data.hits)
      });
  }, [query]);

  return(
    <>
      <input 
        placeholder="Search for news"
        onChange={handleSearch}
      />
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
    </>
  );
}