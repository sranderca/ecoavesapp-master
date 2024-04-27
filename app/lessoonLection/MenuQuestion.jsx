import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { Dimensions } from "react-native";

const MenuQuestion = ({ route, navigation }) => {
  const { lection } = route.params;
  const { height } = Dimensions.get("window");

  const handlePress = () => {
    navigation.navigate("Questions", { lection });
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
            height: height * 0.3,
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
            marginTop: height * 0.25,
            height: 120,
            width: 120,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: "#D3D3D3",
          alignItems: "center",
          height: height * 0.58,
          padding: 30,
        }}
      >
        <Text style={styles.title}>Enfoque General</Text>
        <Text style={styles.description}>
          Compruebe su conocimiento sobre {lection.title}
        </Text>
        <View style={styles.containerIcon}>
          <Image
            source={require("../../assets/question.png")}
            style={styles.iconInfo}
          />
        </View>
        <View style={styles.lecciones}>
          <Text style={styles.text}>Cuestionario</Text>
        </View>
      </View>
      <View styles={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress()}>
          <Text
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 16 }}
          >
            Comprobar conocimiento
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
  },
  containerImage: {
    padding: 10,
  },
  icon: {
    alignSelf: "center",
    position: "absolute", // Para que el icono se pueda superponer
    zIndex: 1, // Asegura que el icono esté sobre la imagen
  },
  containerInfo: {},
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 50,
  },
  description: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 70,
    marginTop: 10,
    fontSize: 16,
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

export default MenuQuestion;
