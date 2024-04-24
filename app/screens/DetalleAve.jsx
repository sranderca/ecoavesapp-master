import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { BlurView } from "expo-blur";
import { Dimensions } from "react-native";

const DetalleAve = ({ route, navigation }) => {
  const { ave } = route.params;
  const { width } = Dimensions.get("window");

  const handleBack = () => {
    navigation.navigate("Tab");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/screenGeneral.png")}
        style={[StyleSheet.absoluteFill]}
      />
      <TouchableOpacity
        style={{ left: 15, marginTop: 10 }}
        onPress={() => handleBack()}
      >
        <Image
          source={require("../../assets/back.png")}
          style={{ width: 35, height: 35 }}
        />
      </TouchableOpacity>
      <View style={styles.head}>
        <Text style={styles.nombreTitulo}>{ave.nombre}</Text>
        <Text style={styles.nombreSub}>{ave.nom_cientifico}</Text>
        <View
          style={{
            width: width,
            height: 30,
            backgroundColor: "#D9D9D9",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            INFORMACION DE LA ESPECIE
          </Text>
        </View>
      </View>
      <BlurView intensity={30} style={{ alignItems: "center" }}>
        <View style={styles.birdCard}>
          <Image source={{ uri: ave.imagen }} style={styles.birdImage} />
          <View style={styles.birdInfo}>
            <Text style={{ marginBottom: 20 }}>{ave.prob_dever}</Text>
            <Text style={styles.description}>{ave.descripcion}</Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
  },
  head: {
    alignItems: "center",
    marginTop: -30,
  },
  birdCard: {
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
    fontSize: 16,
    fontWeight: "600",
    textAlign: "justify",
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
