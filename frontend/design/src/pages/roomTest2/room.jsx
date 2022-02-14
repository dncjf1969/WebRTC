import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestComponent from './TestComponent';


export default function Room() {
  const navigate = useNavigate();
  const user = window.localStorage.getItem("nickname")
  const id = window.localStorage.getItem("id")
  const token = window.localStorage.getItem("token")
  const roomId = window.localStorage.getItem("roomId")
  const jwt = window.localStorage.getItem("jwt")
  
  return (
    <TestComponent navigate={navigate} user={user} id={id} token={token} roomId={roomId} jwt={jwt}/>
  );
}