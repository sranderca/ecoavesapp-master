import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_STORE } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { BlurView } from "expo-blur";
import birds from "../data/birds";

const HomeScreen = () => {
  const [currentBirdIndex, setCurrentBirdIndex] = useState(0);
  const auth = getAuth();
  const [users, setUsers] = useState([]);
  const user = auth.currentUser;
  let uid = null;

  if (user !== null) {
    uid = user.uid;
  } else {
    console.error("Error al obtener el uid");
  }

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(FIREBASE_STORE, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsers(userData);
          console.log(users);
        } else {
          console.log("No such document!");
          return null;
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        throw error;
      }
    };
    fetchData(); 
  }, []);


  const currentBird = birds[currentBirdIndex];

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/screenGeneral.png")}
        style={[styles.image, StyleSheet.absoluteFill]}
      />
      {users ? (
        <>
          <BlurView intensity={90} style={{ alignItems: "center" }}>
            <Image source={{ uri: users.avatar }} style={styles.avatar} />
            <Text style={styles.text}>{users.username}</Text>
            <Text style={styles.text}>Puntos: {users.score}</Text>
          </BlurView>
        </>   
      ) : (
        <Text>No hay datos del usuario</Text>
      )}
      <View style={styles.containerText}>
        <Text style={styles.textTitle}>
          Especies de aves amenazadas en DRMI Laguna de Sonso
        </Text>
      </View>
      <BlurView intensity={80}>
        <View style={styles.birdCard}>
          <Image source={{ uri: currentBird.image }} style={styles.birdImage} />
          <View style={styles.birdInfo}>
            <Text style={styles.birdName}>{currentBird.nombreComun}</Text>
            <Text style={styles.scientificName}>
              {currentBird.nombreCientifico}
            </Text>
            <Text style={styles.description}>{currentBird.description}</Text>
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
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    height: 100,
    width: 100,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
  containerText: {
    padding: 20,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  birdCard: {
    width: 300,
    maxWidth: "100%",
    textAlign: "center",
  },
  birdImage: {
    width: 300,
    height: 250,
    resizeMode: "cover",
  },
  birdInfo: {
    padding: 20,
  },
  birdName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scientificName: {
    color: "#666",
    marginBottom: 10,
  },
  description: {
    lineHeight: 20,
  },
});

export default HomeScreen;
