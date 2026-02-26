// app/components/map.tsx

import { View, StyleSheet } from 'react-native';
import { MapView, Camera, VectorSource, FillLayer } from '@rnmapbox/maps';
import { useSelectedCountries } from '../../contexts/SelectedCountriesContext';
import '@/mapboxConfig';

const MapComponent = () => {

  const { selectedCountries } = useSelectedCountries(); // Get the selected countries from the context
  return (
    <View style={styles.container}>
      <MapView
        styleURL="mapbox://styles/blad3z/cm3op886700sc01s92a29489b"
        style={styles.map}
        scrollEnabled={false} 
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        logoEnabled={false} // Disable Mapbox watermark
        attributionEnabled={false} // Disable attribution
        scaleBarEnabled={false} // Disable scale bar
      >
        <Camera
          zoomLevel={0} centerCoordinate={[-0, 42]}
          animationDuration={0} // Disable camera animation
        />
        <VectorSource
          id="countries"
          url="mapbox://mapbox.country-boundaries-v1"
        >
          <FillLayer
            id="country-fill"
            sourceLayerID="country_boundaries"
            style={{
              fillColor: '#FF0000', // Needs a better color
              fillOpacity: 0.5,
            }}
            filter={['in', 'iso_3166_1', ...selectedCountries]} // Filter the selected countries
          />
        </VectorSource>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapComponent;