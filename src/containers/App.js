import React, { Component } from 'react';
import './App.css';

import Game from '../components/game'
import Instructions from '../components/instructions'


class App extends Component {
  render() {
    return (
      <div className="gameContainer img-responsive text-center">
        <Instructions />
        <Game />
      </div>
    );
  }
}

export default App;
