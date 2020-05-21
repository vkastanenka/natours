// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Utilities
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// Mapbox map for individual tour
class Map extends Component {
  state = {
    style: process.env.REACT_APP_MAPBOX_STYLE,
    scrollZoom: false,
  };

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.state.style,
      scrollZoom: this.state.scrollZoom,
    });

    const bounds = new mapboxgl.LngLatBounds();

    this.props.locations.forEach((location) => {
      // 1. Create a marker
      const el = <div className="marker" />;

      // 2. Add the marker
      new mapboxgl.Marker({
        el,
        anchor: 'bottom'
      })
        .setLngLat(location.coordinates)
        .addTo(map);

      // 3. Add popup
      new mapboxgl.Popup({
        offset: 30,
      })
        .setLngLat(location.coordinates)
        .setHTML(`<p>Dat ${location.day}: ${location.description}</p>`)
        .addTo(map);

      // 4. Extend map bounds to include current location
      bounds.extend(location.coordinates);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });
  }

  render() {
    return (
      <section className="section-map">
        <div ref={(el) => (this.mapContainer = el)} id='map' />;
      </section>
    );
  }
}

Map.propTypes = {
  locations: PropTypes.array.isRequired,
};

export default Map;
