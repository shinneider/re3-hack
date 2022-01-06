import { useEffect, useState } from "react";
import { VaultItemProps } from './props'

import { Typography, TextField, MenuItem } from '@mui/material';

export default function VaultItemCpnt(props: VaultItemProps) {
  const [gameVaultIten, setGameVaultItem] = useState(0);
  const [gameVaultItemChoices, setGameVaultItemChoices] = useState({});

  const setVaultItem = (event: any) => {
    window.electron.ipcRenderer.send('set-iventory-item', {position: props.vault, item: parseInt(event.target.value)})
  };

  const fetchVaultItem = async () => {
    setGameVaultItem(await window.electron.ipcRenderer.invoke('get-iventory-item', props.vault));
  };

  const fetchVaultItemChoices = async () => {
    console.log(1111, await window.electron.ipcRenderer.invoke('get-iventory-item-choices'))
    setGameVaultItemChoices(await window.electron.ipcRenderer.invoke('get-iventory-item-choices'));
  };


  useEffect(() => {
    fetchVaultItemChoices();
    const interval = setInterval(() => fetchVaultItem(), 750);
    return () => clearInterval(interval);
  }, [gameVaultIten]);

  return (
    <div>
      <Typography id="non-linear-slider" gutterBottom>
        Vault Item {props.vault} Position
      </Typography>
      <TextField
        variant="standard"
        type="number"
        fullWidth
        select
        value={gameVaultIten}
        onChange={setVaultItem}>
          {Object.entries(gameVaultItemChoices).map((option) => (
            <MenuItem key={option[0]} value={option[0]}>
              {option[1]}
            </MenuItem>
          ))}
      </TextField>
    </div>
  );
}
