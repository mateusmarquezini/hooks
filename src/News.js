/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import newsService from './newsService';

const News = props => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  document.body.style = darkMode ? 'background: black;' : 'background: white;';

  const searchInputRef = useRef();

  useEffect(() => {
    search();
  }, []);

  const search = async () => {
    try {
      setLoading(true);
      const response = await newsService.get(query);
      setResults(response.data.hits);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  const handleSearch = event => {
    event.preventDefault();
    search();
  };

  const handleClean = event => {
    event.preventDefault();
    setQuery('');
    searchInputRef.current.focus();
  };

  const enableDarkMode = () => {
    setDarkMode(prevState => !prevState);
  };

  const styles = {
    backgroundTheme: darkMode
      ? 'container max-x-md mx-auto p-4 m-2 bg-grey-darkest shadow-lg rounded'
      : 'container max-x-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded',
    listLabel: darkMode ? 'font-mono text-grey-lightest' : 'font-mono text-grey-darkest',
    links: darkMode
      ? 'font-mono text-indigo-lighter hover:text-indigo-light'
      : 'font-mono text-indigo-dark hover:text-indigo-darkest',
    inputText: darkMode
      ? 'font-mono border-grey-dark p-1 rounded bg-grey-dark'
      : 'font-mono border-grey-light p-1 rounded bg-grey-light'
  };

  return (
    <div className={styles.backgroundTheme}>
      <img src="https://icon.now.sh/react/c0c" alt="React Logo" className="float-right h-12" />
      <img
        src="https://icon.now.sh/opacity/aaaa"
        onClick={enableDarkMode}
        alt="React Logo"
        className="float-right h-5"
      />
      <div className="text-xs float-right">Dark mode</div>
      <h1 className={styles.listLabel}>Hooks news</h1>
      <form className="mb-5" onSubmit={handleSearch}>
        <input
          className={styles.inputText}
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          ref={searchInputRef}
        />
        <button className="font-mono bg-green rounded m-1 p-1" type="submit">
          Search
        </button>
        <button
          className="font-mono bg-teal text-white rounded p-1"
          type="button"
          onClick={handleClean}
        >
          Clean
        </button>
      </form>
      {loading ? (
        <div className="font-bold text-orange-dark">Loading results...</div>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a className={styles.links} href={result.url}>
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="font-mono text-red font-bold">{error.message}</div>}
    </div>
  );
};

export default News;
