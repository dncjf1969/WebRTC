import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import isAuthenticated from '../api/isAuthenticated';
import { loadUser } from '../../features/account/authSlice';
import { deleteToken } from '../JWT-common';
// import { resetBadge } from '../../features/mypage/MyPage';

export default function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    dispatch(loadUser())
      .unwrap()
      .catch((err) => {
        if (err.status === 401 && location.pathname !== '/') {
          deleteToken();
          navigate.push('/login');
          setTimeout(() => {
            toast.error('😥 로그인 해주세요');
          }, 1000);
        } else if (err.status === 500) {
          navigate.push('/error');
        }
      });
  }, [location]);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Route path to="/login" />
      }
    />
  );
}
