import styles from "/styles/Home.module.css";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [bin, setBin] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSearch = async () => {
    const res = await fetch(`/api/bin-checker?bin=${bin}`);
    const data = await res.json();
    setResult(data);

    const newHistory = [bin, ...history];
    setHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">BIN Checker</h1>
      <input
        type="text"
        value={bin}
        onChange={(e) => setBin(e.target.value)}
        placeholder="Enter BIN"
        className="border p-2 mb-4"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
        Search
      </button>
      {result && (
        <div className="mt-4">
          <h2 className="text-2xl">Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      <div className="mt-4">
        <h2 className="text-2xl">Search History:</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index} className="border-b p-2">
              {item}
            </li>
          ))}
        </ul>
        {history.length > 0 && (
          <button onClick={clearHistory} className="bg-red-500 text-white p-2 mt-2">
            Clear History
          </button>
        )}
      </div>
    </div>
  );
}
