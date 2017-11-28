import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './reset.css';
import router from './router';

class App extends Component {
  render() {
    return (
      <div className="papa">
        {router}
      </div>
    );
  }
}

export default App;
