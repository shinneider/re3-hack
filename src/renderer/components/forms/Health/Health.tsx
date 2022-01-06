import { useEffect, useState } from "react";

import { Slider, Typography, Checkbox, FormControlLabel } from '@mui/material';

export default function HealthCpnt() {
  const [gameHealth, setGameHealth] = useState(0);
  const [fixHealth, setFixHealth] = useState(false);

  const setHackGameHealth = (event: any, newValue: any) => {
    window.electron.ipcRenderer.send('set-health', newValue * 12)
  };

  const fetchHealth = async () => {
    setGameHealth(await window.electron.ipcRenderer.invoke('get-health') / 12);
  };

  const handleHealthFix = async (event: any) => {
    setFixHealth(event.target.checked);
    window.electron.ipcRenderer.send('lock-health', event.target.checked)
  };

  useEffect(() => {
    const interval = setInterval(() => fetchHealth(), 750);
    return () => clearInterval(interval);
  }, [gameHealth, fixHealth]);

  return (
    <div>
      <Typography id="non-linear-slider" gutterBottom>
        Health:
      </Typography>
      <Slider
        key={`slider-${gameHealth}`}
        aria-label="Player Health"
        defaultValue={gameHealth}
        step={5}
        valueLabelDisplay="auto"
        marks
        min={35}
        max={100}
        onChangeCommitted={setHackGameHealth}
        disabled={fixHealth}
      />
      <FormControlLabel control={<Checkbox checked={fixHealth} onChange={handleHealthFix}/>} label="Keep health" />
    </div>
  );
}
