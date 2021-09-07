import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Link,
  useParams
} from "react-router-dom";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import  Captions  from './captions/Captions';
import  Idioms  from '../../features/idioms/Idioms';
import  Grams  from '../../features/grams/Grams';
import {
  selectCapsByMedia,
  selectCapsByMediaStatus,
  selectCutsByMedia,
  getCapsByMedia,
  getCutsByMedia,
  setMedia,
  selectPrevMedia
} from './mediaSlice';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Media() {
  const dispatch = useDispatch();
  const { media } = useParams();
  const caps = useSelector(selectCapsByMedia);
  const cuts = useSelector(selectCutsByMedia);
  const status = useSelector(selectCapsByMediaStatus);
  const prev_media = useSelector(selectPrevMedia);
  useEffect(() => {
    console.log('uuuu')
    console.log(cuts)
    if (prev_media != media) {
      console.log('NOT SAME', prev_media)
      dispatch(getCapsByMedia(media))
      dispatch(setMedia(media))
    } else {
      console.log('Same')
    }
    dispatch(getCutsByMedia(media))

  }, []);

  const classes = useStyles();
  const [value, setValue] = React.useState(parseInt(localStorage.getItem('media_tab_index')) || 0);

  const handleChange = (event, newValue) => {
    localStorage.setItem('media_tab_index', newValue)
    setValue(newValue);
  };


  return (
    <>
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Captions" {...a11yProps(0)} />
          <Tab label="Idioms" {...a11yProps(1)} />
          <Tab label="HSK" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Captions media={media} caps={caps} status={status} cuts={cuts}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Idioms media={media} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grams media={media} />
      </TabPanel>
    </div>
    </>
  );
}
