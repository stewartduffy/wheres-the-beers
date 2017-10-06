import React from 'react';
import { Marker } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import GoogleMapsWrapper from './GoogleMapsWrapper.js';

class Map extends React.Component {
  componentWillMount() {
    this.setState({
      markers: []
    })
  }

  componentDidMount() {
    const url = [
      // Length issue
      `https://gist.githubusercontent.com`,
      `/stewartduffy/d4416d18f8e19a7f2bb35da03a8113df`,
      `/raw/beer.json`
    ].join("")

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({markers: data.features});
      });
  }

  render () {
    const mapDiv = (
      <div
        style={{
          width: `100%`,
          height: `100%`
        }}
      />
    );

    const mapElements = {
      loadingElement: mapDiv,
      containerElement: mapDiv,
      mapElement: mapDiv,
    };

    return (
      <GoogleMapsWrapper
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        defaultZoom={5}
        defaultCenter={{
          lat: -40.900557,
          lng: 174.88597100000004
        }}
        {...mapElements}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {
            this.state.markers.map((marker, index) => {
              const { geometry } = marker;

              return (
                <Marker
                  key={`marker-${index}`}
                  position={{
                    lat: geometry.coordinates[1],
                    lng: geometry.coordinates[0]
                  }}
                />
              )
            })
          }

          </MarkerClusterer>
      </GoogleMapsWrapper>
    );
  }
}

export default Map
