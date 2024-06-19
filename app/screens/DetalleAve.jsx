import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BlurView } from "expo-blur";
import { Dimensions } from "react-native";

const DetalleAve = ({ route, navigation }) => {
  const { ave } = route.params;
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("window");

  const handleBack = () => {
    navigation.navigate("Tab");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{ marginBottom: -20 }}
          onPress={() => handleBack()}
        >
          <Image
            source={require("../../assets/back.png")}
            style={{ width: 35, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.nombreTitulo}>{ave.nombre}</Text>
      <Text style={styles.nombreSub}>({ave.nom_cientifico})</Text>
      <View style={styles.infoEspecie}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          INFORMACION DE LA ESPECIE
        </Text>
      </View>
        <Image
          source={{ uri: ave.imagen }}
          style={{
            width: "100%",
            height: 300,
            marginTop: 30
          }}
        />
        <View style={styles.containerInfo}>
          <Text style={styles.text}>{ave.descripcion}</Text>
          <Text style={styles.orden}>Orden</Text>
          <Text style={styles.text}>{ave.orden}</Text>
          <Text style={styles.orden}>Familia</Text>
          <Text style={styles.text}>{ave.familia}</Text>
          <Text style={styles.orden}>Probabilidad de ver</Text>
          <Text style={styles.text}>{ave.prob_dever}</Text>
          <Text style={styles.orden}>Donde la puedo encontrar</Text>
          <Text style={styles.text}>{ave.dondela_encuentro}</Text>
          <Text style={styles.orden}>Estado de conservacion</Text>
          <Text style={styles.text}>{ave.estado_conservacion}</Text>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#D0FFE8",
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  nombreTitulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  nombreSub: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 20,
    textAlign: "center",
  },
  infoEspecie: {
    width: "100%",
    height: 30,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  containerInfo: {
    flex: 1,
    padding: 16
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    fontWeight: "400",
  },
  orden: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});

export default DetalleAve;
