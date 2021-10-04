import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDuanyu,
  getDuanyu,
  getDuanyuByMedia
} from './duanyuSlice';
import {selectLanguage} from '../language/languageSlice';

import {
  Link
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';

export default function Duanyu(props) {
  const {media} = props
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const duanyu = useSelector(selectDuanyu);

  useEffect(() => {
    if (media) {
      return dispatch(getDuanyuByMedia(media))
    }

    dispatch(getDuanyu())
  }, [dispatch, language, media]);

  function DuanyuContent() {
    if (duanyu.length > 0) {
      return (
        <>
        <p>
          <strong>
            词汇
          </strong>
        </p>
        <Grid container spacing={1} style={{fontSize: '14px'}}>
        {duanyu.map((duanyu, i) => (
          <Grid item xs={3} key={ Math.random().toString(36).substr(2, 9) }>
            <Link to={`/search?is_duanyu=true&phrase=${duanyu}`}>{duanyu}</Link>
          </Grid>
          ))}
        </Grid>
        </>
      )
    }
      return (<>No 词汇</>)
  }
  return (
    <>
      <DuanyuContent />
    </>
  );
}
