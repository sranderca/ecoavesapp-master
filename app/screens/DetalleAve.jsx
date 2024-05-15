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
        <Text style={styles.nombreSub}>({ave.nom_cientifico})</Text>
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
        <View style={{ width: width * 0.8, textAlign: "center" }}>
          <Image
            source={{ uri: ave.imagen }}
            style={{
              width: width * 0.8,
              height: height * 0.4,
              resizeMode: "contain",
            }}
          />
          <View style={styles.birdInfo}>
            <Text style={{ marginTop: -30, marginBottom: 5, fontSize: 16 }}>
              <Text style={styles.subtitle}>Orden </Text>
              <Text>{ave.orden}</Text>
            </Text>
            <Text style={styles.title}>
              <Text style={styles.subtitle}>Familia </Text>
              <Text>{ave.familia}</Text>
            </Text>
            <Text style={styles.title}>
              <Text style={styles.subtitle}>Probabilidad de ver </Text>
              <Text>{ave.prob_dever}</Text>
            </Text>
            <Text style={styles.title}>
              <Text style={styles.subtitle}>Donde la puedo encontrar? </Text>
              <Text>{ave.dondela_encuentro}</Text>
            </Text>
            <Text style={styles.title}>
              <Text style={styles.subtitle}>Estado de conservacion </Text>
              <Text style={{ fontWeight: "400" }}>
                {ave.estado_conservacion}
              </Text>
            </Text>
            <Text style={styles.description}>{ave.descripcion}</Text>
          </View>
        </View>
      </BlurView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#D0FFE8",
  },
  head: {
    alignItems: "center",
    marginTop: -30,
    paddingHorizontal: 50,
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
  },
  birdInfo: {
    paddingHorizontal: 10,
  },
  title: { 
    marginBottom: 5, 
    fontSize: 16 
  },
  subtitle: {
    color: "#1485F5",
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
    fontWeight: "400",
  },
});

export default DetalleAve;
