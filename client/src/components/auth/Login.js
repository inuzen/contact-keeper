import React, {useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const {setAlert} = alertContext;
  const {loginUser, error, clearErrors, isAuthenticated} = authContext;

  useEffect(()=>{
    if (isAuthenticated) {
      props.history.push('/'); //redirect to home page using props
    }
    if (error==='Invalid Credentials') { //need to changee checking the actual text to some kind of code
      setAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]); //dont add the said dependencies since it will cause an infinite loop

  const [user, setUser] = useState({
    email:'',
    password: ''
  });

  const { email, password} = user;

  const onChange = e => setUser({...user, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    if (!email || !password) {
      setAlert('Please fill in all fields', 'danger');
    } else {
      loginUser({email, password})
    }
  }

  return (
  <div className='form-container'>
    <h1>
      Account <span className='text-primary'>Login</span>
    </h1>
    <form onSubmit={onSubmit}>

      <div className='form-group'>
        <label htmlFor='email'>Email Address</label>
        <input type='email' name = 'email' value={email} onChange={onChange} required/>
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input type='password' name = 'password' value={password} onChange={onChange} required/>
      </div>
      <input type='submit' value='login' className='btn btn-primary btn-block'/>
    </form>
  </div>
  )
}

Login.propTypes = {

};

export default Login;
