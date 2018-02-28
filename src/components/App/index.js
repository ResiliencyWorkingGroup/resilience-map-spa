import React, { Component } from 'react';
import MapHeader from '../MapHeader';
import LeafletMap from '../LeafletMap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <MapHeader />
        <LeafletMap />
      </div>
    );
  }
}

export default App;
