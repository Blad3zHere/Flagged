import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/privacypolicy";

export default function Settings() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const handleShowTerms = () => {
    setShowTerms(true);
  };

  const handleCloseTerms = () => {
    setShowTerms(false);
  };

  const handleShowPrivacyPolicy = () => {
    setShowPrivacyPolicy(true);
  };

  const handleClosePrivacyPolicy = () => {
    setShowPrivacyPolicy(false);
  };

  return (
    <View style={styles.container}>
      {showTerms && (
        <View style={styles.overlay}>
          <TermsOfService onClose={handleCloseTerms} showButtons={false} />
        </View>
      )}
      {showPrivacyPolicy && (
        <View style={styles.overlay}>
          <PrivacyPolicy onClose={handleClosePrivacyPolicy} />
        </View>
      )}
      <ScrollView>
        <View style={styles.listContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Settings</Text>
          </View>
          <View style={styles.txtContainer}>
            <Text style={styles.txtAppVersionTitle}>App Version:</Text>
            <Text style={styles.txtAppVersion}>1.0.2</Text>
          </View>
          <TouchableOpacity style={styles.listButton}>
            <Text style={styles.buttonText}>About the app</Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
          <Link href="reportbugs" asChild>
            <TouchableOpacity style={styles.listButton}>
              <Text style={styles.buttonText}>Report a Bug</Text>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.listContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Support</Text>
          </View>
          <TouchableOpacity style={styles.listButton} onPress={handleShowPrivacyPolicy}>
            <Text style={styles.buttonText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listButton} onPress={handleShowTerms}>
            <Text style={styles.buttonText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={24} color="black" />
          </TouchableOpacity>

          {/* This is still WIP */}
          <Link href="contactus" asChild>
            <TouchableOpacity style={styles.listButton}>
              <Text style={styles.buttonText}>Contact Us</Text>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
          </Link>
        </View>
        <Text style={styles.copyrightText}>© 2025 Flagged.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  titleContainer: {
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingVertical: 10,
  },
  listContainer: {
    marginTop: 5,
    marginHorizontal: 15,
  },
  title: {
    fontFamily: 'BonaNova-Bold',
    fontSize: 22,
  },
  txtAppVersionTitle: {
    fontFamily: 'SourceSans3-Medium',
    fontSize: 16,
    marginLeft: 15,
  },
  txtAppVersion: {
    fontFamily: 'SourceSans3-Medium',
    fontSize: 16,
    color: "#000",
    marginRight: 15,
  },
  listButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  buttonText: {
    fontFamily: 'SourceSans3-Medium',
    fontSize: 16,
    color: "#000",
  },
  txtContainer: {
    paddingVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copyrightText: {
    fontSize: 16,
    paddingTop: 45,
    color: 'grey',
    textAlign: 'center',
    fontFamily: 'SourceSans3-Regular',
  },
});