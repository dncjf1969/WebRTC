// basic
import React, { useState, forwardRef } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from '../../common/http-common';

// material ui
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Zoom from '@material-ui/core/Zoom';

// toast
import { toast } from 'react-toastify';

// action
import { deleteToken } from '../../common/JWT-common';

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom in ref={ref} {...props} />;
});


export default function DraggableDialog({nickname}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const doDeleteUser = () => {
    handleClose();
      axios.delete(`/members`)
      .then(() => {
        toast.success('😥 회원탈퇴가 완료 되었습니다');
        deleteToken();
        navigate.push('/login');
      })
      .catch((error) => {
        console.log(error)
        toast.error('😥 회원탈퇴 중 문제가 발생하였습니다');
        deleteToken();
        navigate.push('/mypage');
      })
    };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<DeleteIcon />}
        onClick={handleClickOpen}
      >
        회원탈퇴
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" />
        <DialogContent>
          <DialogContentText>
            {nickname}님 정말로 탈퇴하시겠습니까?😥😥
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={doDeleteUser} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
