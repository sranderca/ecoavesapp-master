import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Dimensions } from "react-native";

const MenuHabitats = ({ navigation }) => {
  const { height } = Dimensions.get("window");

  const handlePress = () => {
    navigation.navigate("Habitats");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          source={require("../../assets/habitat.jpg")}
          resizeMode="cover"
          style={{
            height: height * 0.3,
            width: "100%",
            borderRadius: 10,
          }}
        />
      </View>

      <View style={styles.icon}>
        <Image
          source={require("../../assets/iconbird.png")}
          resizeMode="contain"
          style={{
            marginTop: height * 0.25,
            height: 120,
            width: 120,
            borderRadius: 14,
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: "#D3D3D3",
          alignItems: "center",
          justifyContent: "center",
          height: height * 0.58,
          padding: 30,
        }}
      >
        <Text style={styles.title}>
          EcoHábitats: Clasificación de Hogares Aviarios
        </Text>
        <Text style={styles.description}>
          ¡Bienvenido a EcoHabitats, un desafiante juego de memoria y
          emparejamiento! Tu objetivo será emparejar las diferentes especies de
          aves con su respectivo habitat o lugar que frecuentan en la Laguna,
          desde arbustos, arboles, cultivos o en el mismo humedal. Buena suerte!
        </Text>
        <View style={styles.containerIcon}>
          <Image
            source={require("../../assets/puzzle.png")}
            style={styles.iconInfo}
          />
        </View>
        <View style={styles.lecciones}>
          <Text style={styles.text}>Juego</Text>
        </View>
      </View>
      <View styles={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
          <Text
            style={{ textAlign: "center", fontWeight: "600", fontSize: 16 }}
          >
            Empezar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    backgroundColor: "#D0FFE8",
  },
  containerImage: {
    padding: 10,
  },
  icon: {
    alignSelf: "center",
    position: "absolute", // Para que el icono se pueda superponer
    zIndex: 1, // Asegura que el icono esté sobre la imagen
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  description: {
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 30,
    fontSize: 16,
    marginTop: 20,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
  containerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  iconInfo: {
    width: 40,
    height: 40,
  },
  lecciones: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 40,
    borderRadius: 100,
    backgroundColor: "white",
  },
  containerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#66FFA6",
    width: 300, // Ajusta el ancho del botón según sea necesario
    height: 50, // Ajusta la altura del botón según sea necesario
    borderRadius: 10,
    marginTop: 13,
  },
});

export default MenuHabitats;
