import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';


export function Advanced() {

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
      <p className='casual'>
        * Most users can ignore this.
      </p>

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

  function isVsisible() {
    const user_code = localStorage.getItem('user_code')
    if (!user_code || localStorage.getItem('user_code')==='undefined') {
      return 'hidden'
    }
    if (user_code && user_code.match(/\s+/)) {
      return 'hidden'
    }
    return 'visible'
  }
  return (
    <span>
      <AdminField />
    </span>
  );
}
