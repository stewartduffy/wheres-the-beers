import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import GoogleMapsWrapper from './GoogleMapsWrapper.js';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this)
    this.handleMarkerClose = this.handleMarkerClose.bind(this)
    this.handleMarkerClose2 = this.handleMarkerClose2.bind(this)
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
        this.setState({
          markers: data.features
        });
      });
  }

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map((marker) => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          }
        } else {
          return {
            ...marker,
            showInfo: false
          }
        }
      })
    })
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      markers: this.state.markers.map((marker) => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false
          }
        }
        return marker
      })
    })
  }

  handleMarkerClose2(targetMarker) { //@TODO: removes this rubbish
    this.setState({
      markers: this.state.markers.map((marker) => {
        if (targetMarker) {
          return {
            ...marker,
            showInfo: false
          }
        }
        return marker
      })
    })
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
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCWDbDPeOT1r8sz5dF6Xmh_ldEw9rqER4I"
        defaultZoom={5}
        defaultCenter={{
          lat: -40.900557,
          lng: 174.88597100000004
        }}
        onClick={this.handleMarkerClose2}
        {...mapElements}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {
            this.state.markers.map((marker, index) => {
              const { geometry, properties } = marker;

              return (
                <Marker
                  key={`marker-${index}`}
                  onClick={() => this.handleMarkerClick(marker)}
                  position={{
                    lat: geometry.coordinates[1],
                    lng: geometry.coordinates[0]
                  }}
                  {...marker}
                >
                  {
                    marker.showInfo && (
                      <InfoWindow onCloseClick={() => this.handleMarkerClose(marker)}>
                        <div
                          style={{
                            width: `200px`,
                          }}
                        >
                          <h3>{properties.name}</h3>
                          {
                            !!properties.description && (
                              <div
                                style={{
                                  lineHeight: `20px`,
                                }}
                                dangerouslySetInnerHTML={{__html: properties.description}}
                              />
                            )
                          }
                        </div>
                    </InfoWindow>
                  )}
                </Marker>
              )
            })
          }

          </MarkerClusterer>
      </GoogleMapsWrapper>
    );
  }
}

export default Map
