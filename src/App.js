import React from 'react';
import { Search } from './features/search/Search';
import { Results } from './features/results/Results';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Search />
        <Results />
      </header>
    </div>
  );
}

export default App;
