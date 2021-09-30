import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  useParams
} from "react-router-dom";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import  Captions  from './captions/Captions';
import  Idioms  from '../../features/idioms/Idioms';
import  Duanyu  from '../../features/duanyu/Duanyu';
import  Prepositions  from '../../features/prepositions/Prepositions';
import  Verbs  from '../../features/verbs/Verbs';
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

import {
  selectVerbs,
  getVerbsByMedia
} from '../verbs/verbsSlice';



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
  const language = localStorage.getItem('language')
  const caps = useSelector(selectCapsByMedia);
  const cuts = useSelector(selectCutsByMedia);
  const status = useSelector(selectCapsByMediaStatus);
  const prev_media = useSelector(selectPrevMedia);
  useEffect(() => {
    if (prev_media !== media) {
      localStorage.setItem('media_tab_index', 0)
      setValue(0);
      dispatch(getCapsByMedia(media))
      dispatch(setMedia(media))
      dispatch(getVerbsByMedia(media))
    }
    dispatch(getCutsByMedia(media))

  }, []);

  const classes = useStyles();
  const [value, setValue] = React.useState(parseInt(localStorage.getItem('media_tab_index')) || 0);

  const handleChange = (event, newValue) => {
    localStorage.setItem('media_tab_index', newValue)
    setValue(newValue);
  };

  function tabChinese() {
    if (language) {
      return language.match(/chinese/) ? 'inline' : 'none'
    }
  }
  function tabNotChinese(flag) {
    if (flag === 0) {
      return 'none';
    }

    if (language) {
      return language.match(/chinese/) ? 'none' : 'inline'
    }
  }

  return (
    <>
    <div className={classes.root}>
      <p>
        {media}
      </p>
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
        <Tab style={{display: tabChinese()}} label="词汇" {...a11yProps(1)} />
        <Tab style={{display: tabChinese()}} label="成语" {...a11yProps(2)} />
        <Tab style={{display: tabChinese()}} label="HSK" {...a11yProps(3)} />
        <Tab style={{display: tabNotChinese(0)}} label="Tenses" {...a11yProps(4)} />
        <Tab style={{display: tabNotChinese()}} label="Verbs" {...a11yProps(5)} />
        <Tab style={{display: tabNotChinese()}} label="Prepositions" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Captions media={media} caps={caps} status={status} cuts={cuts} language={language}/>
      </TabPanel>
      <TabPanel style={{display: tabChinese()}}  value={value} index={1}>
        <Duanyu media={media} language={language} />
      </TabPanel>
      <TabPanel style={{display: tabChinese()}}  value={value} index={2}>
        <Idioms media={media} language={language} />
      </TabPanel>
      <TabPanel style={{display: tabChinese()}}  value={value} index={3}>
        <Grams media={media} language={language}/>
      </TabPanel>
      <TabPanel style={{display: tabNotChinese(0)}}  value={value} index={4}>
        Tenses
      </TabPanel>
      <TabPanel style={{display: tabNotChinese()}}  value={value} index={5}>
        <Verbs media={media} language={language}/>
      </TabPanel>
      <TabPanel style={{display: tabNotChinese()}}  value={value} index={6}>
        <Prepositions media={media} language={language}/>
      </TabPanel>
    </div>
    </>
  );
}
