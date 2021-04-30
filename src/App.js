import React from 'react';
import { Search } from './features/search/Search';
import { Results } from './features/results/Results';
import { Player } from './features/player/Player';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Search />
        <Player />
        <Results />
      </header>
    </div>
  );
}

export default App;
