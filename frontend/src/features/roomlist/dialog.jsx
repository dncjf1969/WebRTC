import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from '../../common/http-common'

export default function FormDialog({room}) {
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnter = async () => {
    await axios
      .get(`/room/waiting/enter?password=${password}&roomId=${parseInt(roomId)}`)
      .then((res) => {
        console.log(res)
        return res.data;
      })
      .catch((err) => {
        console.log(err)
        return err;
      });
  };
  const {name, job, manager, memberCount, memberMax, roomId, type, exitPassword} = room
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {name}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            방장 : {manager}
          </DialogContentText>
          <DialogContentText>
            분야 : {type} - {job}
          </DialogContentText>
          <DialogContentText>
            인원 : {memberCount} / {memberMax}
          </DialogContentText>
          {exitPassword ? <TextField
            autoFocus
            margin="dense"
            id={String(roomId)}
            label="password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          /> : null}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleEnter}>입장</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}