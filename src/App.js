import React from 'react';
import { Search } from './features/search/Search';
import { Results } from './features/results/Results';
import { Tenses } from './features/tenses/Tenses';
import { Conjugations } from './features/conjugations/Conjugations';
import { Conjugation } from './features/conjugation/Conjugation';
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
              <Grid item xs={12}>
                <Search />
              </Grid>
              <Grid item style={{overflow: 'auto', border: "1px solid blue"}} item xs={12}>
                <Tenses />
              </Grid>
              <Grid item xs={12}>
                <Conjugation />
              </Grid>
              <Grid item style={{overflow: 'auto', border: "1px solid blue"}} item xs={12}>
                <Conjugations />
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
