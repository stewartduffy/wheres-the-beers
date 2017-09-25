import React from 'react'
import fetch from "isomorphic-fetch";
import {compose, withProps, lifecycle} from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: (
      <div style={{
        height: `100%`
      }}/>
    ),
    containerElement: (
      <div style={{
        width: `100%`,
        height: `100%`
      }}/>
    ),
    mapElement: <div style={{height: `100%`}}/>,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentWillMount() {
      this.setState({markers: []})
    },

    componentDidMount() {
      fetch('https://gist.githubusercontent.com/stewartduffy/d4416d18f8e19a7f2bb35da03a8113df/raw/beer.json')
        .then(res => res.json())
        .then(data => {
          this.setState({markers: data.features});
        });
    }
  })
)(props => {
    return (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={{
          lat: -40.900557,
          lng: 174.88597100000004
        }}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {
            props.markers.map((marker, index) => {
              const { geometry } = marker;
                return (
                  <Marker
                    key={`marker-${index}`}
                    position={{lat: geometry.coordinates[1], lng: geometry.coordinates[0]}}
                  />
                )
            })}
        </MarkerClusterer>
      </GoogleMap>
    )
  }
);

export default MapWithAMarkerClusterer
