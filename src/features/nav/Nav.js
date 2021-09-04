import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import {Search} from "../search/Search"
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Drawer from "@material-ui/core/Drawer";
import {selectLanguage} from '../language/languageSlice';


const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  appBar: {
   zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },

  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
    display: "none"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },

  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  }
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const language = useSelector(selectLanguage);
  let nav_options = language ? ['Favorites', 'History', 'Settings'] : []
  if (nav_options.length > 0) {
    nav_options.unshift('Medias')
    if (!language.match('Chinese')) {
      nav_options.unshift('Tenses')
    } else {
      nav_options.unshift('Grams')
      nav_options.unshift('Idioms')
    }
  }
  useEffect(() => {

  }, [language]);
  const [open, setOpen] = useState(false);

  const toggleDrawer = event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Audioverb
          </Typography>
          <Search />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant={isMdUp ? "permanent" : "temporary"}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
        open={open}
        onClose={toggleDrawer}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {nav_options.map((text, index) => (
            <ListItem button key={text} component={Link} to={`/${text.toLowerCase()}`}>
              <ListItemText primary={text}  />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>

        <Toolbar />
      </main>
    </div>
  );
}
