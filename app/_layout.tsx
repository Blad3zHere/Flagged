// app/_layout.tsx

import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions } from "react-native";
import { Stack, Link } from "expo-router";
import { SelectedCountriesProvider, useSelectedCountries } from "../contexts/SelectedCountriesContext";
import { TermsProvider, useTerms } from "../contexts/TermsContext";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

// Save button for the countrylist screen
function HeaderSaveButton() {
  const { saveSelectedCountries } = useSelectedCountries();

  const handleSave = async () => {
    await saveSelectedCountries();
    alert('Selections saved!');
  };

  return (
    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
      <Text style={styles.saveButtonText}>Save</Text>
    </TouchableOpacity>
  );
}

function RootLayout() {
  const { termsAccepted } = useTerms();

  return (
      <SelectedCountriesProvider>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{
              headerShown: termsAccepted, // Show the header if the terms have been accepted
              headerTitle: () => (
                <Image
                  source={require('@/assets/images/logo_black.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              ),
              headerTitleStyle: {
                fontFamily: 'BonaNova-Bold',
                fontSize: 24,
              },
              headerRight: () => (
                <View style={styles.navbar}>
                  <Link style={styles.navLink} href="/settings">
                    <View style={styles.iconWrapper}>
                      <Ionicons name="settings-outline" size={24} color="black" />
                    </View>
                  </Link>
                  <Link style={styles.navLink} href="/countrylist">
                    <View style={styles.iconWrapper}>
                      <Ionicons name="add-outline" size={24} color="black" />
                    </View>
                  </Link>
                </View>
              ),
            }} 
          />
          <Stack.Screen 
            name="settings" 
            options={{
              title: 'Settings',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'BonaNova-Bold',
                fontSize: 24,
              },
              }}
          />
          <Stack.Screen
            name="countrylist"
            options={{
              title: 'Country List',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'BonaNova-Bold',
                fontSize: 24,
              },
              headerRight: () => <HeaderSaveButton />,
            }}
          />
          <Stack.Screen 
            name="reportbugs" 
            options={{
              title: 'Report Bugs',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'BonaNova-Bold',
                fontSize: 24,
              },
              }}
          />
          <Stack.Screen 
            name="contactus" 
            options={{
              title: 'Contact Us',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'BonaNova-Bold',
                fontSize: 24,
              },
              }}
          />
        </Stack>
      </SelectedCountriesProvider>
  );
}

// Export the root component
export default function App() {
  return (
    <TermsProvider>
      <RootLayout />
    </TermsProvider>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: width * 0.3,
    height: undefined,
    aspectRatio: 3, // Maintain the aspect ratio of the image
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  navLink: {
    marginLeft: 15,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'SourceSans3-Bold',
  },
});