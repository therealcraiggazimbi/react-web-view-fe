import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/checkout/session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const session = await response.json();
      console.log("Session:", session); // For debugging
      if (session.url) {
        setCheckoutUrl(session.url);
      } else {
        throw new Error("Invalid session URL");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (checkoutUrl) {
    return <WebView source={{ uri: checkoutUrl }} style={{ marginTop: 20 }} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Checkout Method</Text>
      <Button title="JavaScript SDK Checkout" onPress={handleCheckout} />
      <Button
        title="React Native SDK Checkout"
        onPress={() => {
          /* Implement this later */
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
