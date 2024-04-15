import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import obtenerLecciones from "../data/obtenerLecciones";
import Constants from "expo-constants";

const Aprender = ({ navigation }) => {
  const [lection, setLection] = useState([]);

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
      <TouchableOpacity style={styles.leccion} onPress={() => handlePress()}>
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

  return (
    <View style={styles.container}>
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
      En la siguiente sección, se presentan distintos casos donde tendrás
      que analizar qué actitudes tomarías en pro de las aves de la laguna y
      su hábitat. Al final, te puedes orientar sobre las mejores decisiones
      respondiendo unas breves preguntas.
    </Text>
    <Text style={styles.tituloLecciones}>Todas las lecciones</Text>
  </View>
  <View style={styles.lecciones}>
    <FlatList
      data={lection}
      renderItem={({ item }) => <LectionCard lection={item} />}
      keyExtractor={(lection) => lection.id}
    />
  </View>
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D0FFE8",
    marginTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 10,
  },
  image: {
    width: 68,
    height: 68,
    marginRight: 10,
  },
  containerText: {
    marginBottom: -5,
  },
  texto: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  tituloLecciones: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    padding: 10,
  },
  lecciones: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  leccion: {
    width: 330,
    height: 125,
    marginBottom: 20,
    backgroundColor: "#ddd",
  },
  textoLeccion: {
    marginTop: 85,
    marginLeft: 13,
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
