import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { BlurView } from "expo-blur";

const DetalleAve = ({ route }) => {
  const { ave } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/screenGeneral.png")}
        style={[StyleSheet.absoluteFill]}
      />
      <Text style={styles.nombreTitulo}>{ave.nombre}</Text>
      <Text style={styles.nombreSub}>{ave.nom_cientifico}</Text>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BlurView intensity={30}>
          <View style={styles.birdCard}>
            <Image source={{ uri: ave.imagen }} style={styles.birdImage} />
            <View style={styles.birdInfo}>
              <Text style={styles.description}>{ave.descripcion}</Text>
            </View>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
  },
  birdCard: {
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
    width: 300,
    maxWidth: "100%",
    textAlign: "center",
  },
  birdImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
    resizeMode: "contain",
  },
  birdInfo: {
    padding: 10,
  },
  description: {
    lineHeight: 20,
  },
  nombreTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  nombreSub: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 20,
  },
});

export default DetalleAve;
