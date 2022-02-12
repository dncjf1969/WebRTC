import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestComponent from './TestComponent';


export default function Room() {
  const navigate = useNavigate();
  return (
    <TestComponent navigate={navigate} test='test'/>
  );
}