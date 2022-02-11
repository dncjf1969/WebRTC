import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from '../../common/http-common'
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { actionCreators } from '../../app/store';
import { render } from 'react-dom';
import TestComponent from '../roomTest2/TestComponent';

function FormDialog({room}) {
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState(null);
  // const [token, setToken] = React.useState('dd');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  let navigate = useNavigate()

  const handleEnter = async () => {
    await axios
      .get(`/room/waiting/enter?password=${password !== null ? password : ''}&roomId=${parseInt(roomId)}`)
      .then((res) => {
        // console.log(res)
        // const token = res.data.token
        
        // console.log(token)
        
        // window.localStorage.setItem('ovToken', token);
        // render(TestComponent)
        // navigate('/roomtest2')

        return res.data;
      })
      .catch((err) => {
        console.log(password, roomId)
        console.log(err)
        return err;
      });
    window.localStorage.setItem('roomId', roomId);
    navigate('/roomtest2')
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

function mapStateToProps(state) {
  // console.log(states)
  return { thisToken: state.tokenReducer }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    saveToken: (token) => dispatch(actionCreators.saveToken(token)) // 만들어서 컴포넌트에서사용
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog);