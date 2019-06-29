import React from 'react';
import logo from './logo.svg';
import flower_2 from './flower_2.png'

import './App.css';

const Header = props => {
  return (

      <div>
      <header className="App-header">
        <img src={flower_2} className="App-logo" alt="logo" />
        <p>
          {props.siteName}
        </p>
        </header>
        </div>
  );
}

export default Header;
