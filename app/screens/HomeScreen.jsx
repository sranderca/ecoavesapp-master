import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from "react-native";
import Constants from "expo-constants";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_STORE } from "../../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { BlurView } from "expo-blur";
import birds from "../data/birds";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";

const HomeScreen = () => {
  const [currentBirdIndex, setCurrentBirdIndex] = useState(0);
  const auth = getAuth();
  const [users, setUsers] = useState([]);
  const user = auth.currentUser;
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("window");
  let uid = null;
  let drawerRef = null;
  let email = "";

  if (user !== null) {
    uid = user.uid;
    email = user.email;
  } else {
    console.error("Error al obtener el uid y el email");
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

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const docRef = doc(FIREBASE_STORE, "users", uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsers(userData);
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
    }, [])
  );

  const currentBird = birds[currentBirdIndex];

  const abrirMenuLateral = () => {
    drawerRef.openDrawer();
  };

  const MenuLateral = () => (
    <View
      style={{
        flex: 1,
        padding: 20,
        alignItems: "center",
      }}
    >
      <Image source={{ uri: users.avatar }} style={styles.avatar} />
      <Text style={styles.text}>{email}</Text>
      <Text style={styles.text}>
        Username{"\n"}
        {users.username}
      </Text>
      <Text style={styles.text}>
        Puntos{"\n"}
        {users.score}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        Cerrar sesion
      </Text>
      <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20 }}>
        <Image
          source={require("../../assets/logout.png")}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={(ref) => (drawerRef = ref)}
      drawerWidth={250}
      drawerPosition={"right"}
      renderNavigationView={() => <MenuLateral />}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={abrirMenuLateral} style={styles.header}>
          <Image
            source={require("../../assets/user.png")}
            style={{ width: width * 0.18, height: height * 0.09 }}
          />
        </TouchableOpacity>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#D0FFE8",
  },
  header: {
    padding: 10,
  },
  avatar: {
    height: 100,
    width: 100,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
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
    width: 200,
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
  logoutButton: {
    position: "absolute",
    top: Constants.statusBarHeight + 10,
    right: 40,
  },
});

export default HomeScreen;
