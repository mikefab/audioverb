import React from 'react';
import  Nav  from './features/nav/Nav';
import { Medias } from './features/medias/Medias';
import { Media } from './features/media/Media';
import { Tenses } from './features/tenses/Tenses';
import { Results } from './features/results/Results';
import { Verb } from './features/verb/Verb';
import { VerbMedia } from './features/verb/VerbMedia';
import Verbs from './features/verbs/Verbs';
import {Favorites} from './features/favorites/Favorites';
import {SeachHistory} from './features/search-history/SearchHistory';
import  {Result} from './features/result/Result';
import  {Settings} from './features/settings/Settings';
import Container from '@material-ui/core/Container'

import {  Route, Switch } from "react-router-dom";
import useGaTracker from './useGaTracker'
import './App.css';

function App() {
  useGaTracker();
  return (
      <Container maxWidth="sm" justify="center" >
      <Nav/>

        <Switch>
          <Route path={`/Language`} component={Settings} />
          <Route path={`/history`} component={SeachHistory}/>
          <Route path={`/favorites`} component={Favorites}/>
          <Route path={`/favorite/:media/:num`} component={Result}/>
          <Route path={`/search/:media/:num`} component={Result}/>
          <Route exact path="/media/:media/:verb/:conjugation/:num" component = {Result} />
          <Route exact path="/media/:media/:verb/:conjugation" component = {VerbMedia} />
          <Route exact path="/media/:media/:verb" component = {VerbMedia} />
          <Route exact path="/medias/:media/:num" component = {Result} />
          <Route exact path="/media/:media" component = {Media} />
          <Route exact path="/medias" component = {Medias} />
          <Route path='/search' component = {Results} />}
          <Route exact path="/" component = {Medias} />
          <Route path={`/tenses/:tense/:verb/:conjugation/:media/:num`} component={Result}/>
          <Route path={`/tenses/:tense/:verb/:conjugation`} component={Verb}/>
          <Route path={`/tenses/:tense/:verb`} component={Verb}/>
          <Route path={`/tenses/:tense`} component={Verbs}/>
          <Route path="/tenses" component={Tenses} />
        </Switch>
      </Container>
  );
}

export default App;
