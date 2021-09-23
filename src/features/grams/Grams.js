import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../TabPanel'
import  {Level} from './Level';

import { getGrams, selectGrams } from '../grams/gramsSlice';

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

export default function Grams(props) {
  const {media, language} = props
  const grams = useSelector(selectGrams);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [value, setValue] = React.useState(parseInt(localStorage.getItem('hsk_tab_index')) || 0);



  useEffect(() => {
  //  if (grams.length < 1) {
      dispatch(getGrams({level: value + 1, media}))
//    }

  }, [media]);

  const handleChange = (event, newValue) => {
    localStorage.setItem('hsk_tab_index', newValue)
    dispatch(getGrams({level: newValue + 1, media}))
    setValue(newValue);
  };

  return (
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
          <Tab label="HSK 1" {...a11yProps(0)} />
          <Tab label="HSK 2" {...a11yProps(1)} />
          <Tab label="HSK 3" {...a11yProps(2)} />
          <Tab label="HSK 4" {...a11yProps(3)} />
          <Tab label="HSK 5" {...a11yProps(4)} />
          <Tab label="HSK 6" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Level grams={grams} media={media} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Level grams={grams} media={media}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Level grams={grams} media={media}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Level grams={grams} media={media}/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Level grams={grams} media={media}/>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Level grams={grams} media={media}/>
      </TabPanel>
    </div>
  );
}
