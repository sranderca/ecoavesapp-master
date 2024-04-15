import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Constants from "expo-constants";

const MenuLection = ({ route, navigation }) => {
  const { lection } = route.params;
  const handlePress = () => {
    navigation.navigate("Lection", { lection });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/screenGeneral.png")}
        style={[StyleSheet.absoluteFill]}
      />

      <View style={styles.containerImage}>
        <Image
          source={{ uri: lection.image }}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
            borderRadius: 10,
          }}
        />
      </View>

      <View style={styles.icon}>
        <Image
          source={{ uri: lection.icon }}
          resizeMode="contain"
          style={{
            marginTop: 175,
            height: 120,
            width: 120,
          }}
        />
      </View>

      <View style={styles.containerInfo}>
        <Text style={styles.title}>{lection.title}</Text>
        <Text style={styles.description}>{lection.description}</Text>
        <View style={styles.containerIcon}>
          <Image
            source={require("../../assets/book1.png")}
            style={styles.iconInfo}
          />
        </View>
        <View style={styles.lecciones}>
          <Text style={styles.text}>Lecciones</Text>
        </View>
      </View>
      <View styles={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
          <Text style={styles.text}>Empezar</Text>
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
  },
  containerImage: {
    padding: 10,
  },
  icon: {
    alignItems: "center",
    position: "absolute", // Para que el icono se pueda superponer
    left: 140,
    zIndex: 1, // Asegura que el icono esté sobre la imagen
  },
  containerInfo: {
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
    padding: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },
  description: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#66FFA6",
    width: 300, // Ajusta el ancho del botón según sea necesario
    height: 50, // Ajusta la altura del botón según sea necesario
    borderRadius: 10,
    left: 45,
    marginTop: 13,
  },
});

export default MenuLection;
