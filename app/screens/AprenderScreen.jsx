import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import obtenerLecciones from "../data/obtenerLecciones";
import { Dimensions } from "react-native";

const Aprender = ({ navigation }) => {
  const [lection, setLection] = useState([]);
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("window");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await obtenerLecciones();
        const lectionData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLection(lectionData);
      } catch (error) {
        console.error("Error al obtener lecciones:", error);
      }
    };
    fetchData();
  }, []);

  const LectionCard = ({ lection }) => {
    const handlePress = () => {
      navigation.navigate("MenuLection", { lection });
    };

    return (
      <TouchableOpacity
        style={{
          width: width * 0.84,
          height: height * 0.16,
          marginBottom: 20,
          alignContent: "center",
          justifyContent: "center",
        }}
        onPress={() => handlePress()}
      >
        <Text style={styles.textoLeccion}>{lection.title}</Text>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: lection.card }}
            style={styles.imagenLecciones}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handlePressHabitats = () => {
    navigation.navigate("MenuHabitats");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Actitudes para la conservación de las aves
        </Text>
        <Image
          source={require("./../../assets/ave-conservacion.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.containerText}>
        <Text style={styles.texto}>
          Bienvenido a la sección de aprendizaje. Aquí encontrarás diversos
          casos en los que tendrás que analizar las acciones que podrías tomar
          para proteger a las aves de la laguna y su entorno. Al final de cada
          caso, podrás evaluar tus decisiones respondiendo algunas preguntas
          breves que te ayudarán a orientarte hacia las mejores prácticas de
          conservación. ¡Aprende y actúa en pro del bienestar de nuestras aves!
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: width * 0.84,
          height: height * 0.16,
          marginBottom: 20,
          alignContent: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
        onPress={() => handlePressHabitats()}
      >
        <Text
          style={{
            marginTop: 70,
            marginLeft: 14,
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
            zIndex: 2,
          }}
        >
          EcoHábitats: Clasificación de Hogares Aviarios
        </Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/ecohabitats.jpg")}
            style={styles.imagenLecciones}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.tituloLecciones}>Todas las lecciones</Text>
      {lection.map((item) => (
        <LectionCard key={item.id} lection={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#D0FFE8",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 40,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 50,
  },
  image: {
    width: 68,
    height: 68,
    marginRight: 10,
  },
  containerText: {
    marginBottom: -20,
    marginTop: 10,
  },
  texto: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    paddingHorizontal: 30,
  },
  tituloLecciones: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  leccion: {
    width: 330,
    height: 125,
    marginBottom: 20,
    backgroundColor: "#ddd",
    alignContent: "center",
    justifyContent: "center",
  },
  textoLeccion: {
    marginTop: 70,
    marginLeft: 14,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    zIndex: 2,
  },
  imagenLecciones: {
    width: undefined,
    height: undefined,
    flex: 1,
    resizeMode: "cover",
    zIndex: 1,
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Aprender;
