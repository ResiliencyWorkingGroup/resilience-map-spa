import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './LeafletMap.css';

// workaround for webpack(?) issue
// https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const osmTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
// const mapCenter = { lat: 37.766945, lng: -122.440629 }; // SF Center
// const mapCenter = { lat: 37.090240, lng: -95.712891 }; // USA Center

class LeafletMap extends Component {
  constructor (props) {
    super(props);

    this.state = {
      hasLocation: false,
      animate: true,
      // San Francisco
      // latlng: { lat: 37.766945, lng: -122.440629 },
      // zoomLevel: 13,
      // United States
      latlng: { lat: 37.090240, lng: -95.712891 },
      zoomLevel: 5,
    }

    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleLocationFound = this.handleLocationFound.bind(this);
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    leafletMap.locate();
  }

  handleMapClick(e) {
    const leafletMap = this.leafletMap.leafletElement;
    this.setState({
      latlng: e.latlng,
      zoomLevel: leafletMap.getZoom(),
    });
  }

  handleLocationFound(e) {
    this.setState({
      hasLocation: true,
      animate: true,
      latlng: e.latlng,
      zoomLevel: 17,
    });
  }

  render() {
    const { latlng, zoomLevel, hasLocation, animate } = this.state;
    const { lat, lng } = this.state.latlng;

    return (
      <Map
        ref={m => { this.leafletMap = m; }}
        className="map"
        center={latlng}
        zoom={zoomLevel}
        animate={animate}
        onClick={this.handleMapClick} 
        onLocationfound={this.handleLocationFound}>

        <TileLayer attribution={attribution} url={osmTiles} />

        { hasLocation &&
          <Marker position={latlng}>
            <Popup>
              <span>{lat}, {lng}</span>
            </Popup>
          </Marker>
        }
      </Map>
    );
  }
}

export default LeafletMap;
