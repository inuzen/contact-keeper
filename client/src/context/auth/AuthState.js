import React, {useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load user
  const loadUser = async () => {
    if(localStorage.token){
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('api/auth'); //private route so we need a token
      dispatch({type: USER_LOADED, payload: res.data});
    } catch (e) {
      dispatch({type: AUTH_ERROR})
    }
  };

  //Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/users', formData, config); //if we didnt have a "proxy" in package.json we would need to include localhost in the url
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (e) {
      dispatch({
        type: REGISTER_FAIL,
        payload: e.response.data.msg //this message comes from backend api since we return a json object here along with the error
      })
    }

  }

  //Login User
  const loginUser = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/auth', formData, config); //if we didnt have a "proxy" in package.json we would need to include localhost in the url
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (e) {
      dispatch({
        type: LOGIN_FAIL,
        payload: e.response.data.msg //this message comes from backend api since we return a json object here along with the error
      })
    }

  }
  //Logout
  const logoutUser = () => {
    dispatch({type: LOGOUT})
  };
  //Clear errors
  const clearErrors = () => {
    dispatch({type: CLEAR_ERRORS})
  };

  return (<AuthContext.Provider value={{
      token: state.token,
      isAuthenticated: state.isAuthenticated,
      loading: state.loading,
      error: state.error,
      user: state.user,
      loadUser, register, loginUser, logoutUser, clearErrors
    }}>
    {props.children}
  </AuthContext.Provider>)
};

export default AuthState;
