import React from 'react';
import  Nav  from './features/nav/Nav';
import { Medias } from './features/medias/Medias';
import { Media } from './features/media/Media';
import { Tenses } from './features/tenses/Tenses';
import { Results } from './features/results/Results';
import { Verb } from './features/verb/Verb';
import { VerbMedia } from './features/verb/VerbMedia';
import Verbs from './features/verbs/Verbs';
import  {Result} from './features/result/Result';
import Container from '@material-ui/core/Container'

import {
  Switch,
  Route,

} from "react-router-dom";
import './App.css';

function App() {
  return (
      <Container maxWidth="sm" justify="center" >
      <Nav/>

        <Switch>
          <Route path={`/search/:name/:num`} component={Result}/>
          <Route exact path="/media/:media/:verb/:conjugation" component = {VerbMedia} />

          <Route exact path="/media/:media" component = {Media} />
          <Route exact path="/medias" component = {Medias} />
          <Route path='/search' component = {Results} />}
          <Route exact path="/" component = {Medias} />
          <Route path={`/tenses/:tense/:verb/:conjugation/:name/:num`} component={Result}/>
          <Route path={`/tenses/:tense/:verb/:conjugation`} component={Verb}/>
          <Route path={`/tenses/:tense/:verb`} component={Verb}/>
          <Route path={`/tenses/:tense`} component={Verbs}/>
          <Route path="/tenses" component={Tenses} />
        </Switch>
      </Container>
  );
}

export default App;
