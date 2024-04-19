import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import { useRoute } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_STORE } from "../../firebaseConfig";

const Score = ({ navigation }) => {
  const route = useRoute();
  const { score } = route.params;
  const [userScore, setUserScore] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserScore = async () => {
      if (user) {
        try {
          const docRef = doc(FIREBASE_STORE, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const currentUserScore = userData.score || 0;
            setUserScore(currentUserScore);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error al obtener el puntaje del usuario:", error);
        }
      }
    };
    fetchUserScore();
  }, [user]);

  useEffect(() => {
    const updateUserScore = async () => {
      if (userScore !== null && user) {
        const newScore = userScore + score;
        try {
          const userDocRef = doc(FIREBASE_STORE, "users", user.uid);
          await updateDoc(userDocRef, {
            score: newScore,
          });
        } catch (error) {
          console.error("Error al actualizar el puntaje del usuario:", error);
        }
      }
    };
    updateUserScore();
  }, [userScore, score, user]);

  const handleFinishQuestion = () => {
    navigation.navigate("Tab");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <Image
          source={require("../../assets/finalquestion.png")}
          style={styles.image}
        />
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            marginBottom: 20,
            fontWeight: "600",
          }}
        >
          Felicidades, has completado el cuestionario!
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 30 }}>
          Obtuviste un puntaje de:
        </Text>
        <Text style={{ fontSize: 60, fontWeight: "600" }}>{score}</Text>
        <Pressable style={styles.Boton} onPress={handleFinishQuestion}>
          <Text style={{ fontSize: 18, color: "white" }}>Finalizar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#D0FFE8",
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 100,
  },
  containerContent: {
    alignItems: "center",
    padding: 20,
  },
  Boton: {
    backgroundColor: "#1485F5",
    height: 50,
    width: 350,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
});

export default Score;
