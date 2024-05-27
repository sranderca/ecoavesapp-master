import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_STORE } from "../../firebaseConfig";
import LottieView from "lottie-react-native";

const Score = ({ navigation }) => {
  const route = useRoute();
  const { score, lection, cuestionarios } = route.params;
  const [userScore, setUserScore] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const idLection = lection.id;
  const lengthQuiz = cuestionarios.length;
  const maxScore = lengthQuiz * 10;
  const [showAnimation, setShowAnimation] = useState(false);

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
    const updateUserScoreAndLogro = async () => {
      if (userScore !== null && user) {
        const newScore = userScore + score;
        const logroCompletado = score === maxScore;
        try {
          const userDocRef = doc(FIREBASE_STORE, "users", user.uid);
          await updateDoc(userDocRef, {
            score: newScore,
            [`logros.${idLection}`]: logroCompletado,
          });
          if (logroCompletado) {
            setShowAnimation(true);
            Alert.alert('Felicidades! Conseguiste un nuevo logro')
          }
        } catch (error) {
          console.error("Error al actualizar el puntaje del usuario:", error);
        }
      }
    };
    updateUserScoreAndLogro();
  }, [userScore, score, user, lection, maxScore]);

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
        <Text style={styles.title}>
          Felicidades, has completado el cuestionario!
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 20 }}>
          Obtuviste un puntaje de:
        </Text>
        <Text style={{ fontSize: 60, fontWeight: "600" }}>{score}</Text>
        {showAnimation && (
          <LottieView
            source={require("../../assets/Animation - 1716529229410.json")}
            autoPlay
            loop={false}
            style={styles.animation}
            onAnimationFinish={() => setShowAnimation(false)}
          />
        )}
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
    backgroundColor: "#D0FFE8",
  },
  containerContent: {
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  Boton: {
    backgroundColor: "#1485F5",
    height: 50,
    width: 350,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});

export default Score;
