import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectChengyu,
  getChengyu,
  getChengyuByMedia
} from './chengyuSlice';
import {selectLanguage} from '../language/languageSlice';

import {
  Link
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';

export default function Chengyu(props) {
  const {media} = props
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const chengyu = useSelector(selectChengyu);
  useEffect(() => {
    if (media) {
      return dispatch(getChengyuByMedia(media))
    }

    dispatch(getChengyu())
  }, [dispatch, language, media]);

  function ChengyuContent() {
    if (chengyu.length > 0) {
      return (
        <>
          <p>
            <strong>
              成语
            </strong>
          </p>
        <Grid container spacing={1} style={{fontSize: '14px'}}>
        {chengyu.map((chengyu, i) => (
          <Grid item xs={3} key={ Math.random().toString(36).substr(2, 9) }>
            <Link to={`/search?is_chengyu=true&phrase=${chengyu}`}>{chengyu}</Link>
          </Grid>
          ))}
        </Grid>
      </>
      )
    }
      return (<>No 成语</>)
  }
  return (
    <>
      <ChengyuContent />
    </>
  );
}
