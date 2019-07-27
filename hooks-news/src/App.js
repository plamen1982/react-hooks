import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function App() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [error, setError] = useState(false);
    const searchElement = useRef(null);

    function handleSubmit(event) {
      event.preventDefault();
        getNews();
    }

    function handleSearch(event) {
      const { target: { value } } = event;
      setQuery(value);
    }

    function handleReset() {
      setQuery('');
      searchElement.current.focus();
    }

    function getNews() {
        setLoading(true);
        axios
            .get(`https://hn.algolia.com/api/v1/search?query=${query}`)
            .then(results => {
                setResults(results.data.hits);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
                setError(true)
            });
    }

    useEffect(() => {
        setQuery('reacthooks')
        getNews();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input 
                  placeholder='Search for news' 
                  onChange={handleSearch} 
                  ref={searchElement} 
                  value={query} 
                  className="border p-1 rounded"
                />
                <button
                  className="bg-teal text-white p-1 rounded m-1">
                  Search
                </button>
                <button 
                  className="bg-teal text-white p-1 rounded"
                  onClick={handleReset}
                >
                  Clear
                </button>
                <div className="font-bold text-orange-dark">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <ul>
                            {results.map(result => (
                                <li key={result.objectID}>{result.title}</li>
                            ))}
                        </ul>
                    )}
                    {error && <div className="text-red font-bold">{error.message}</div>}
                </div>
            </form>
        </>
    );
}
