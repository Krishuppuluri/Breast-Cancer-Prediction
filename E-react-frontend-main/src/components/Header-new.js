import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Header.css'
class Header extends React.Component {
  render(){
    const { type } = this.props.user;
    return (
     <header>
      <nav class="headerbody">
      <input type="checkbox" id="check"/>
      <label for="check" class="checkbtn">
        <i class="fa fa-bars"></i>
      </label>
      <label class="logo"><span>e</span>Hospital</label>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/specialities">Specialities</Link></li>
        <li><Link to="/AboutUs">About Us</Link></li>
        <li><Link to="/contact">Contact US</Link></li>
        {type ==='Doctor' ? (<>
          <li><Link to="/doctor">Panel</Link></li>
        </>):(<></>)}
        {type ==='Patient' ? (<>
          <li><Link to="/patient">Portal</Link></li>
        </>):(<></>)}
        {type ==='Admin' ? (<>
          <li><Link to="/Admin">Admin Home</Link></li>
        </>):(<></>)}
        {type === 'NotLoggedIn'? (<>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/LogIn">LogIn</Link></li>
          <li><Link to="/signUp">SignUp</Link></li>
          </> ):( <><li onClick={this.props.clearUser}><Link to="/LogIn">SignOut</Link></li></>)
        }
      </ul>
    </nav>
    </header>
    );
  }
}

export default Header;
