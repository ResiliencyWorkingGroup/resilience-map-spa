import React, { Component } from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

const polygonColors = {
  'SF Neighborhoods': 'purple',
  'Seismic Hazard Zones': 'red',
};

class GeoJson extends Component {
  constructor(props) {
    super(props);

    this.layerGroup = this.props.layerGroup;

    this.onEachFeature = this.onEachFeature.bind(this);
    this.pointToLayer = this.pointToLayer.bind(this);
    this.style = this.style.bind(this);
  }

  componentDidMount() {
    const element = this.leafletElement.leafletElement;
    element.on('popupopen', () => console.log('popup opened'));
  }

  onEachFeature(feature, layer) {
    layer.bindTooltip(`${feature.properties.title}`);
    layer.bindPopup(`${feature.properties.title}`);
  }

  pointToLayer(geoJsonPoint, latlng) {
    // const markerOptions = {draggable: true}; // example
    const markerOptions = {};
    return L.marker(latlng, markerOptions);
  }

  style(geoJsonFeature) {
    const pathOptions = {color: polygonColors[this.layerGroup] || 'blue'}
    // const pathOptions = {color: "#ff0000"}; // example
    // const pathOptions = {};
    return pathOptions;
  }
  render() {
    return (
      <GeoJSON
        ref={element => this.leafletElement = element }
        pointToLayer={this.pointToLayer}
        style={this.style}
        data={this.props.data}
        onEachFeature={this.onEachFeature}
      />
    )
  }
}

export default GeoJson;
