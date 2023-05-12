import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const navigate = useNavigate();
  const [logText, changeLogText] = useState("Login");
  useEffect(() => {
    if(global.logged) {
      changeLogText("Logout");
    }
    else {
      changeLogText("Login");
    }
  })

  function handleLogin() {
    if (global.logged) {
      global.logged = false;
      global.metamaskAccounts = undefined;
      console.log(global.accounts)
      navigate("/Login");
      changeLogText('Login');
      props.showAlert("User Logged Out, please Disconnect your wallet manually. For security reasons, we are not allowed to close the connection from our end",'success');
    }
    else {
      navigate("/Login");
    }
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary ">
        <div className="container-fluid">
          <img src={require('../images/icon-logo.png')} className='logo' alt="Girl in a jacket" width="60" height="60"/>
            <Link className="text--white navbar-brand" to="/">Smart Lottery</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to={"/"} className="nav-link active" aria-current="page" ><div className="text--white blink">Home</div></Link>
                </li>
                {global.logged && <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to={global.address.toLowerCase() === global.admin.toLowerCase() ? '/Admin' : '/Section'}><div className='text--white blink'>Lottery</div></Link>
                </li>}
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/AboutUs"><div className="text--white blink">About Us</div></Link>
                </li>
              </ul>
              <button className="btn btn-light" onClick={handleLogin} type="submit">{logText}</button>
            </div>
        </div>
      </nav>
    </>
  )
}