import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import BaseScreen from './base/BaseScreen';

import { Button, Grid } from '@mui/material';


export default function GameStatus(props: any) {
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();

  const connectListner = (arg: boolean) => {
    setConnected(arg);
    if (arg) {
      navigate('/hack-form')
    }
  }

  const checkConnection = () => {
    window.electron.ipcRenderer.once('game-running', connectListner)
    window.electron.ipcRenderer.send('game-check-process')
  }

  return (
    <BaseScreen>
      <Grid container spacing={2} className='text-center'>
        <Grid item xs={12} className='mt-5 mb-5'>
          <b>Game Status: </b>
          {connected ? <span className='text-success'> Connected </span> :  <span className='text-danger'> Not Connected </span>}
        </Grid>
        <Grid item xs={12}>
          <Grid className="d-grid gap-2">
            <Button variant="outlined" color="error" onClick={checkConnection}> Open the game and click here</Button>
          </Grid>
        </Grid>
        </Grid>
    </BaseScreen>
  )
}
