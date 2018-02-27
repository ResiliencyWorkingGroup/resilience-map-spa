import React, { Component } from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

class GeoJson extends Component {
  constructor(props) {
    super(props);

    this.onEachFeature = this.onEachFeature.bind(this);
    this.spawnGeoJsonPoint = this.spawnGeoJsonPoint.bind(this);
    this.styleGeoJsonLinePolygon = this.styleGeoJsonLinePolygon.bind(this);
  }

  componentDidMount() {
  console.log(this.props.layerGroup, this.leafletElement);
  }

  onEachFeature(feature, layer) {
    layer.bindTooltip(`${feature.properties.title}`);
    layer.bindPopup(`${feature.properties.title}`);
  }

  spawnGeoJsonPoint(geoJsonPoint, latlng) {
    // const markerOptions = {draggable: true}; // example
    const markerOptions = {};
    return L.marker(latlng, markerOptions);
  }

  styleGeoJsonLinePolygon(geoJsonFeature) {
    // const pathOptions = {color: "#ff0000"}; // example
    const pathOptions = {};
    return pathOptions;
  }
  render() {
    return (
      <GeoJSON
        ref={element => this.leafletElement = element }
        pointToLayer={this.spawnGeoJsonPoint}
        style={this.styleGeoJsonLinePolygon}
        data={this.props.data}
        onEachFeature={this.onEachFeature}
      />
    )
  }
}

export default GeoJson;
