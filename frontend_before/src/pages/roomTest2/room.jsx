import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestComponent from './TestComponent';
import axios from '../../common/http-common'

export default function Room() { 
  const roomId = window.localStorage.getItem("roomId")
  const navigate = useNavigate();
  
  return (
    <TestComponent 
      navigate={navigate} 
      roomId={roomId} 
    />
  );
}