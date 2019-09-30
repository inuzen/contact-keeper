import React,{Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({title, icon}) => {

  const authContext = useContext(AuthContext);

  const {isAuthenticated, logoutUser, user} = authContext;

  const onLogout = () => {
      logoutUser();
  }

  const authLinks =(
    <Fragment>
      <li>Hello {user && user.name}!</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className='fas fa-sign-out-alt'/><span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  )

  return (<div className="navbar bg-primary">
  <h1>
    <i className={icon}/> {title}
  </h1>
  <ul>
    {isAuthenticated? authLinks : guestLinks }
    {/*small redisign, getting rid of home and about pages since they serve no purpose*/
    // <li>
    //   <Link to='/'>Home</Link>
    // </li>
    // <li>
    //   <Link to='/about'>About</Link>
    // </li>
    // <li>
    //   <Link to='/register'>Register</Link>
    // </li>
    // <li>
    //   <Link to='/login'>Login</Link>
    // </li>
  }
  </ul>
  </div>
  );
}
  Navbar.propTypes = {
    title: PropTypes.array.isRequired,
    icon: PropTypes.string
  };
  Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt"
  }

  export default Navbar;
