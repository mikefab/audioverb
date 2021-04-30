import React from 'react';
import { Search } from './features/search/Search';
import { Results } from './features/results/Results';
import { Player } from './features/player/Player';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import './App.css';

function App() {
  return (
    <Container maxWidth="sm" >
      <div className="App">
        <header className="App-header">
          <Grid container justify="center" className="grid">
            <Grid container justify="center">
              <Grid item>
                <Search />
              </Grid>
              <Grid item>
                <Player />
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Results />
            </Grid>
          </Grid>
        </header>
      </div>
    </Container>
  );
}

export default App;
