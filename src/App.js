import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import MapWithAMarkerClusterer from './components/Map/Map'


class App extends Component {
  render() {
    return (
      <div className="App">
          <MapWithAMarkerClusterer />
      </div>
    );
  }
}

export default App;
