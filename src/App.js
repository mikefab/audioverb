import React from 'react';
import { Tenses } from './features/tenses/Tenses';
import { Conjugation } from './features/conjugation/Conjugation';
import Conjugations from './features/conjugations/Conjugations';
import {
  Switch,
  Route,

} from "react-router-dom";
import './App.css';

function App() {
  return (
      <div>
        <Switch>
          <Route exact path="/" component = {Tenses} />
          <Route path={`/tenses/:tense/:conjugation`} component={Conjugation}/>
          <Route path={`/tenses/:tense`} component={Conjugations}/>
          <Route path="/tenses" component={Tenses} />
        </Switch>
      </div>
  );
}

export default App;
