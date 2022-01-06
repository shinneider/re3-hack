import { useEffect, useState } from "react";

import { Typography, Checkbox, FormControlLabel, TextField } from '@mui/material';

export default function AmmoCpnt() {
  const [gameItemQty, setGameItemQty] = useState(0);
  const [fixItemQty, setFixItemQty] = useState(false);

  const setHackGameHealth = (event: any) => {
    window.electron.ipcRenderer.send('set-equipped-qty', parseInt(event.target.value))
  };

  const fetchAmmoQty = async () => {
    setGameItemQty(await window.electron.ipcRenderer.invoke('get-equipped-qty'));
  };

  const handleFixItemQty = async (event: any) => {
    setFixItemQty(event.target.checked);
    window.electron.ipcRenderer.send('lock-equipped-qty', event.target.checked)
  };

  useEffect(() => {
    const interval = setInterval(() => fetchAmmoQty(), 750);
    return () => clearInterval(interval);
  }, [gameItemQty, fixItemQty]);

  return (
    <div>
      <Typography id="non-linear-slider" gutterBottom>
        Equiped Item Ammo:
      </Typography>
      <TextField
        variant="standard"
        type="number"
        fullWidth
        value={gameItemQty}
        disabled={fixItemQty}
        onChange={setHackGameHealth}/>
      <FormControlLabel control={<Checkbox checked={fixItemQty} onChange={handleFixItemQty}/>} label="Keep Item Qty" />
    </div>
  );
}
