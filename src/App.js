import React from 'react';
import { Tenses } from './features/tenses/Tenses';
import { Conjugation } from './features/conjugation/Conjugation';
import Conjugations from './features/conjugations/Conjugations';
import Container from '@material-ui/core/Container'

import {
  Switch,
  Route,

} from "react-router-dom";
import './App.css';

function App() {
  return (
      <Container maxWidth="sm" justify="center">
        <Switch>
          <Route exact path="/" component = {Tenses} />
          <Route path={`/tenses/:tense/:conjugation`} component={Conjugation}/>
          <Route path={`/tenses/:tense`} component={Conjugations}/>
          <Route path="/tenses" component={Tenses} />
        </Switch>
      </Container>
  );
}

export default App;
