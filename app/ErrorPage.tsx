import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface ErrorScreenProps {
  error: string;
  resetError?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, resetError }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // If can't go back, attempt to navigate to a safe screen
      navigation.navigate("Home" as never);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops! Something went wrong.</Text>
      <Text style={styles.errorMessage}>{error}</Text>
      <View style={styles.buttonContainer}>
        {resetError && (
          <TouchableOpacity style={styles.button} onPress={resetError}>
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  errorMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ErrorScreen;
