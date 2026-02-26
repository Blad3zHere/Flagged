// app/countrylist.tsx

import { useState, useEffect, useMemo } from 'react';
import { View, TextInput, FlatList, StyleSheet, Text } from 'react-native';
import { useSelectedCountries } from '../contexts/SelectedCountriesContext';
import CountryButton from './components/countrybutton';


interface CountryData {
  name: string;
  code: string;
}

export default function CountryList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<CountryData[]>([]);
  const { selectedCountries, setSelectedCountries, savedSelectedCountries, countryData } = useSelectedCountries();

  // Sort and memoize the country data
  const sortedCountryData = useMemo(() => {
    return [...countryData].sort((a, b) => a.name.localeCompare(b.name));
  }, [countryData]);

  // Combine the selected countries from the context
  const allSelectedCountries = useMemo(
    () => [...new Set([...savedSelectedCountries, ...selectedCountries])],
    [savedSelectedCountries, selectedCountries]
  );

  // Initialize filtered data with sorted countries
  useEffect(() => {
    setFilteredData(sortedCountryData);
  }, [sortedCountryData]);

  // Handle the search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = sortedCountryData.filter(country =>
        country.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(sortedCountryData);
    }
  };

  // Render the country item
  const renderItem = ({ item }: { item: CountryData }) => {
    const isSelected = allSelectedCountries.includes(item.code);
    return (
      <CountryButton
        country={item}
        isSelected={isSelected}
        onSelect={(country: CountryData) => {
          if (isSelected) {
            // Remove the country from the selected list
            setSelectedCountries(prev => prev.filter(code => code !== country.code));
          } else {
            // Add the country to the selected list
            setSelectedCountries(prev => [...prev, country.code]);
          }
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search countries..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {filteredData.length === 0 ? (
        <Text style={styles.noResultsText}>No countries found</Text>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem} 
          keyExtractor={item => item.code} // Use the country code as the key
          initialNumToRender={10} // Initial render count
          maxToRenderPerBatch={8} // Maximum render count per batch
          windowSize={8} // Number of items to render in advance
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 44,
    borderColor: '#818181',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
