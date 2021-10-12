import React from 'react';
import { useDispatch } from 'react-redux';
import  About  from './features/about/About';
import  Chengyu  from './features/chengyu/Chengyu';
import  Grams  from './features/grams/Grams';
import  Idioms  from './features/idioms/Idioms';
import  Duanyu  from './features/duanyu/Duanyu';
import  Nav  from './features/nav/Nav';
import { Medias } from './features/medias/Medias';
import { Media } from './features/media/Media';
import { Explorer } from './features/explorer/Explorer';
import  {Language} from './features/language/Language';
import  Prepositions from './features/prepositions/Prepositions';
import { Tenses } from './features/tenses/Tenses';
import { Results } from './features/results/Results';
import { Verb } from './features/verb/Verb';
import { VerbMedia } from './features/verb/VerbMedia';
import { setLanguage} from './features/language/languageSlice';
import Verbs from './features/verbs/Verbs';
import {Favorites} from './features/favorites/Favorites';
import {SeachHistory} from './features/search-history/SearchHistory';
import  {Result} from './features/result/Result';
import  {Settings} from './features/settings/Settings';
import Container from '@material-ui/core/Container'
import {
  useHistory,
  useLocation
} from "react-router-dom";
import {  Route, Switch } from "react-router-dom";
import useGaTracker from './useGaTracker'
import './App.css';


import available_languages from './features/language/available_languages'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function App(props) {
  useGaTracker();
  const dispatch = useDispatch();
  let query = useQuery();
  const location = useLocation()
  const history = useHistory()
  const languages = available_languages()

  const language = languages[query.get("language")] ? query.get("language") : localStorage.getItem("language")
  if (!language && !location.pathname.match(/\/language/)) {
    history.push('/language');
    return (<></>)
  }
  if (language){
      dispatch(setLanguage(language))
  }



  return (
      <Container maxWidth="sm" justify="center" >
      <Nav/>
        <Switch>
          <Route path={`/about`} component={About}/>
          <Route path={`/chengyu`} component={Chengyu}/>
          <Route path={`/settings`} component={Language} />
          <Route path={`/language`} component={Language} />
          <Route path={`/HSK`} component={Grams}/>
          <Route path={`/prepositions`} component={Prepositions}/>
          <Route path={`/idioms`} component={Idioms}/>
          <Route path={`/duanyu`} component={Duanyu}/>
          <Route path={`/history`} component={SeachHistory}/>
          <Route path={`/favorites`} component={Favorites}/>
          <Route path={`/favorite/:media/:num`} component={Result}/>
          <Route path={`/search/:media/:num`} component={Result}/>
          <Route path={`/search/:media`} component={Results}/>
          <Route exact path="/media/:media/:verb/:conjugation/:num" component = {Result} />
          <Route exact path="/media/:media/:verb/:conjugation" component = {VerbMedia} />
          <Route exact path="/media/:media/:verb" component = {VerbMedia} />
          <Route exact path="/medias/:media/:num" component = {Result} />
          <Route exact path="/media/:media" component = {Media} />
          <Route exact path="/medias" component = {Medias} />
          <Route path='/search' component = {Results} />}
          <Route exact path="/" component = {Explorer} />
          <Route path={`/tenses/:tense/:verb/:conjugation/:media/:num`} component={Result}/>
          <Route path={`/tenses/:tense/:verb/:conjugation`} component={Verb}/>
          <Route path={`/tenses/:tense/:verb`} component={Verb}/>
          <Route path={`/verbs`} component={Verbs}/>
          <Route path={`/verb/:verb/:conjugation`} component={Verb}/>
          <Route path={`/tenses/:tense`} component={Verbs}/>
          <Route path="/tenses" component={Tenses} />
        </Switch>
      </Container>
  );
}

export default App;
