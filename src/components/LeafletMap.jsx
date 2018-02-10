import React, { Component } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import './LeafletMap.css';

const osmTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
const mapCenter = [37.80, -122.42];
const zoomLevel = 14;

class LeafletMap extends Component {
  render() {
    return (
      <div className="map-wrapper">
        <Map className="map" center={mapCenter} zoom={zoomLevel}>
          <TileLayer attribution={attribution} url={osmTiles} />
        </Map>
      </div>
    );
  }
}

export default LeafletMap;