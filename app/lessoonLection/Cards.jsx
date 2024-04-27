import * as React from "react";
import { Pressable, StyleSheet, Image, Text } from "react-native";

export default function Card({ onPress, isTurnedOver, imageUrl }) {
  return (
    <Pressable
      onPress={onPress}
      style={isTurnedOver ? styles.cardUp : styles.cardDown}
    >
      {isTurnedOver ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text style={styles.text}>?</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  cardUp: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  cardDown: {
    width: 100,
    height: 100,
    margin: 10,
    borderWidth: 10,
    borderColor: "#334155",
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  text: {
    fontSize: 46,
    color: "#334155",
  },
});
