// ./contexts/SelectedCountriesContext.tsx

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as FileSystem from 'expo-file-system/legacy';
import CountryDataFetcher from '../app/components/api/CountryDataFetcher';

interface CountryData {
  name: string;
  code: string;
  continent: string;
}

// Context to store the selected countries
interface SelectedCountriesContextProps {
  selectedCountries: string[];
  setSelectedCountries: React.Dispatch<React.SetStateAction<string[]>>;
  savedSelectedCountries: string[];
  saveSelectedCountries: () => Promise<void>;
  countryData: CountryData[];
  loading: boolean;
}

// Create the selected countries context with default value of undefined
const SelectedCountriesContext = createContext<SelectedCountriesContextProps | undefined>(undefined);

// Provider to manage the selected countries state
interface SelectedCountriesProviderProps {
  children: ReactNode;
}

const selectedCountriesFilePath = `${FileSystem.documentDirectory}selectedCountries.json`; // Stores the selected countries locally
const countryDataFilePath = `${FileSystem.documentDirectory}countryData.json`;             // Stores the api countries locally

export const SelectedCountriesProvider = ({ children }: SelectedCountriesProviderProps) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);           // State to store the selected countries
  const [savedSelectedCountries, setSavedSelectedCountries] = useState<string[]>([]); // State to store the saved selected countries
  const [countryData, setCountryData] = useState<CountryData[]>([]);                  // State to store the country data
  const [loading, setLoading] = useState(true);                                       // State to manage loading state

  // Load saved selected countries and country data from file on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const selectedCountriesFileInfo = await FileSystem.getInfoAsync(selectedCountriesFilePath); // Check if the file exists
        if (selectedCountriesFileInfo.exists) {
          const fileContents = await FileSystem.readAsStringAsync(selectedCountriesFilePath);
          const storedCountries = JSON.parse(fileContents);
          setSavedSelectedCountries(storedCountries); // Set the saved selected countries
          setSelectedCountries(storedCountries);      // Loads the selected countries from the file, upon app restart
        }
        
        // Load the country data
        const countryDataFileInfo = await FileSystem.getInfoAsync(countryDataFilePath);
        if (countryDataFileInfo.exists) { 
          const fileContents = await FileSystem.readAsStringAsync(countryDataFilePath);
          const storedCountryData = JSON.parse(fileContents);
          if (Array.isArray(storedCountryData) && storedCountryData.length > 0) {
            setCountryData(storedCountryData);
            //console.log('Loaded country data from file:', storedCountryData);
          } else {
            //console.log('Stored data is empty; fetching...');
            const data = await CountryDataFetcher();
            setCountryData(data);
            await FileSystem.writeAsStringAsync(countryDataFilePath, JSON.stringify(data));
            //console.log('Fetched and saved new country data:', data);
          }
        } else {
          const data = await CountryDataFetcher(); // Fetch the country data
          setCountryData(data);
          await FileSystem.writeAsStringAsync(countryDataFilePath, JSON.stringify(data)); // Save the country data to a file
          //console.log('Fetched and saved country data:', data);   // Debug log
        }
      } catch (error) {
        //console.error('Error reading saved data from file:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSavedData();
  }, []);

  // Function to save selected countries
  const saveSelectedCountries = async () => {
    try {
      await FileSystem.writeAsStringAsync(
        selectedCountriesFilePath,
        JSON.stringify(selectedCountries)
      );
      // Update the savedSelectedCountries state
      setSavedSelectedCountries(selectedCountries);
      console.log('Selected countries saved:', selectedCountries);
    } catch (error) {
      console.error('Error saving selected countries to file:', error);
    }
  };

  return (
    // Provide the selected countries context to the children
    <SelectedCountriesContext.Provider
      value={{ selectedCountries, setSelectedCountries, savedSelectedCountries, saveSelectedCountries, countryData, loading }}
    >
      {children}
    </SelectedCountriesContext.Provider>
  );
};

// Custom hook to use the selected countries context
export const useSelectedCountries = () => {
  const context = useContext(SelectedCountriesContext);
  if (!context) {
    throw new Error('useSelectedCountries must be used within a SelectedCountriesProvider');
  }
  return context;
};