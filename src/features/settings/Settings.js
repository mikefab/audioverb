import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function Settings() {



  function LanguageSelection() {
    return (
      <FormControl className={classes.formControl}>
      <Grid container >
        <Grid item xs={12}>

              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                onChange={handleChange}
              >
                <MenuItem value={10}>Spanish</MenuItem>
                <MenuItem value={20}>French</MenuItem>
                <MenuItem value={30}>Chinese</MenuItem>
              </Select>
              </Grid>
            </Grid>
            </FormControl>
    )
  }

  function AdminField() {
  const [temp_user_code, setTempUserCode] = useState(localStorage.getItem('user_code') || '');
  const [user_code, setUserCode] = useState(localStorage.getItem('user_code') || '');
  const _onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user_code', user_code)
    setTempUserCode(user_code)
  }
    return (
      <span>
      <form onSubmit={_onSubmit}>
        <Grid container >
          <Grid item xs={6}>
            <TextField
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  // Do code here
                  // dispatch(getResults(query))
                }
              }}
              aria-label="Type query"
              label="User code"
              // variant='filled'
              color="primary"
              onChange={(e) => setUserCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              type="submit"
            />
          </Grid>
        </Grid>
      </form>
      <br/>
      <span style={{visibility: isVsisible()}}>
        Current Admin ID is: "{temp_user_code}"
      </span>
      </span>
    )
  }

  const classes = useStyles();
  const [language, setLanguage] = React.useState('');

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  function isVsisible() {
    return localStorage.getItem('user_code')==='undefined' ? 'hidden' : 'visible'
  }
  return (
    <span>
      <AdminField />
    </span>
  );
}
