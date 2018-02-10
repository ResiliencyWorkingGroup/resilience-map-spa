import React, { Component } from 'react';
import LeafletMap from './components/LeafletMap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Resiliency Map</h1>
        </header>
        <LeafletMap />
      </div>
    );
  }
}

export default App;
