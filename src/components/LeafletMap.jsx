import React, { Component } from 'react';
import { Map,
  TileLayer,
  ScaleControl,
  LayersControl,
  GeoJSON,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import './LeafletMap.css';

// workaround for webpack(?) issue
// https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// initial map settings
const osmTiles = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
const mapCenter = { lat: 37.766945, lng: -122.440629 }; // San Francisco, CA;
const zoomLevel = 13;

const { Overlay } = LayersControl;

class LeafletMap extends Component {
  constructor(props) {
    super(props);

    this.basePath = process.env.REACT_APP_API_SERVER_URL;

    this.state = {
      layerGroupIds: [],
      layerGroupsById: {},
    };

    this.onEachFeature = this.onEachFeature.bind(this);
    this.fetchLayerGroups = this.fetchLayerGroups.bind(this);
    this.fetchGroupDataset = this.fetchGroupDataset.bind(this);
  }

  componentDidMount() {
    this.fetchLayerGroups()
      .then((layerGroups) => {
        this.setState({
          layerGroupIds: layerGroups.map(grp => grp.name),
          layerGroupsById: layerGroups.reduce((result, grp) => {
            result[grp.name] = grp;
            return result;
          }, {}),
        });

        // return layerGroups.filter(grp => !grp.readOnly); // internal data only
        return layerGroups; // all data
      })
      .then(layerGroups => {
        layerGroups.forEach(layerGroup => {
          this.fetchGroupDataset(layerGroup.url)
            .then(dataset => {
              this.setState({
                ...this.state,
                layerGroupsById: {
                  ...this.state.layerGroupsById,
                  [layerGroup.name]: {
                    ...this.state.layerGroupsById[layerGroup.name],
                    dataset,
                  },
                },
              });
            });
        });
      })
      .catch(e => e);
  }

  fetchLayerGroups() {
    return fetch(`${this.basePath}/map-datasets`)
      .then((response) => response.json())
      .catch(e => e);
  }

  fetchGroupDataset(url) {
    return fetch(url)
      .then((response) => response.json())
      .catch(e => e);
  }

  onEachFeature(feature, layer) {
    layer.bindTooltip(`${feature.properties.title}`);
    layer.bindPopup(`${feature.properties.title}`);
  }

  spawnGeoJsonPoint(geoJsonPoint, latlng) {
    const markerOptions = {};
    // const markerOptions = {draggable: true}; // example
    return L.marker(latlng, markerOptions);
  }

  styleGeoJsonLinePolygon(geoJsonFeature) {
    const pathOptions = {};
    // const pathOptions = {color: "#ff0000"}; // example
    return pathOptions;
  }

  render() {
    // console.log('state', this.state);
    const { layerGroupIds, layerGroupsById } = this.state;

    return (
      <Map
        className="map"
        ref={m => { this.leafletMap = m; }}
        center={mapCenter}
        zoom={zoomLevel}>
        <TileLayer attribution={attribution} url={osmTiles} />

        <LayersControl position="topright">
          { layerGroupIds.map((layerGroup) => {
            if (!layerGroupsById[layerGroup].dataset) return null;

            return (
              <Overlay
                key={layerGroup}
                name={layerGroup}
                checked={!layerGroupsById[layerGroup].readOnly}>
                <GeoJSON
                  data={layerGroupsById[layerGroup].dataset}
                  pointToLayer={this.spawnGeoJsonPoint}
                  style={this.styleGeoJsonLinePolygon}
                  onEachFeature={this.onEachFeature} />
              </Overlay>
            )
          }) }
        </LayersControl>

        <ScaleControl position="bottomleft" />
      </Map>
    );
  }
}

export default LeafletMap;
