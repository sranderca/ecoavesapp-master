import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Dimensions } from "react-native";

const FinalLection = ({ route, navigation }) => {
  const { lection } = route.params;
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("window");

  const handlePress = () => {
    navigation.navigate("MenuQuestion", { lection });
  };

  return (
    <View styles={styles.container}>
      <Image
        source={require("../../assets/FinalLection.png")}
        resizeMode="cover"
        style={{
          height: height * 0.35,
          width: "100%",
          marginTop: Constants.statusBarHeight,
        }}
      />
      <View style={styles.icon}>
        <Image
          source={{ uri: lection.icon }}
          resizeMode="contain"
          style={{
            marginTop: height * 0.15,
            height: 120,
            width: 120,
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: "white",
          height: height * 0.56,
          alignItems: "center",
          justifyContent: "center",
          padding: 30,
        }}
      >
        <Text style={styles.title}>¡Felicitaciones!</Text>
        <Text style={styles.subtitle}>Has completado {lection.title}</Text>
        <Text style={styles.textInfo}>
          Puedes repetir la lección en cualquier momento para refrescar tus
          conocimientos
        </Text>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
          <Text style={styles.text}>Terminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  icon: {
    alignSelf: "center",
    position: "absolute", // Para que el icono se pueda superponer
    zIndex: 1, // Asegura que el icono esté sobre la imagen
    width: 100,
    height: 100,
  },
  containerInfo: {
    backgroundColor: "white",
    height: 450,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: -200,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    textAlign: 'center'
  },
  textInfo: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "400"
  },
  containerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#66FFA6",
    width: 300, // Ajusta el ancho del botón según sea necesario
    height: 50, // Ajusta la altura del botón según sea necesario
    marginTop: 70,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FinalLection;
