import React from 'react';
import { Search } from './features/search/Search';
import { Results } from './features/results/Results';
import { Conjugation } from './features/conjugation/Conjugation';
import { Player } from './features/player/Player';
import { Explorer } from './features/explorer/Explorer';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import './App.css';

function App() {
  return (
    <Container maxWidth="sm" justify="center" >
      <div className="App">
        <header className="App-header">
          <Grid container  justify="center" className="grid">
            <Grid container>
              <Grid item xs={12}>
                <Search />
              </Grid>
              <Grid item xs={12}>
                <Conjugation />
              </Grid>
              <Grid item xs={12} style={{height: '400px'}}>
                <Explorer />
              </Grid>
              <Grid item>
                <Player />
              </Grid>
            </Grid>
          </Grid>
          <Grid container >
            <Grid item style={{textAlign: 'left'}}>
              <Results />
            </Grid>
          </Grid>
        </header>
      </div>
    </Container>
  );
}

export default App;
