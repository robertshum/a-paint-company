import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { useQuery } from 'react-query';


function App() {
  const [count, setCount] = useState(0);

  // Test
  const { data, isLoading, error } = useQuery('helloworld', async () => {
    const response = await fetch('http://localhost:3000/api/helloworld');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });

  // state management from query
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div>
        <h1>Hello from Backend</h1>
        <p>ID: {data.anotherId}</p>
        <p>Message: {data.message}</p>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
