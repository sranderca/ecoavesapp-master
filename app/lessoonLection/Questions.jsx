import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_STORE } from "../../firebaseConfig";
import Constants from "expo-constants";
import * as Progress from "react-native-progress";
import { Dimensions } from "react-native";

const Questions = ({ route, navigation }) => {
  const { width } = Dimensions.get("window");
  const [cuestionarios, setCuestionarios] = useState([]);
  const { lection } = route.params;
  const idLection = lection.id;
  const [currentQuestionsIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizProgress, setQuizProgress] = useState(cuestionarios.length);
  const progress = (currentQuestionsIndex + 1) / quizProgress;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIREBASE_STORE, "Lecciones", idLection, "Cuestionario")
        );
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setCuestionarios(data);
        setQuizProgress(data.length);
      } catch (error) {
        console.error("Error al obtener los cuestionarios:", error);
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    if (currentQuestionsIndex === cuestionarios.length - 1) {
      navigation.navigate("Score", { score: score });
    } else {
      setCurrentQuestionIndex(currentQuestionsIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  const handleOptionPress = (pressedOption) => {
    if (selectedOption !== null) {
      return;
    }
    setSelectedOption(pressedOption);

    const isAnswerCorrect =
      cuestionarios[currentQuestionsIndex].respuesta === pressedOption;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 10);
    }
  };

  return (
    <View style={styles.container}>
      <Progress.Bar progress={progress} width={null} height={20}></Progress.Bar>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "600",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Pregunta: {currentQuestionsIndex + 1}
      </Text>
      {cuestionarios.length > 0 ? (
        <>
          <View style={styles.containerQues}>
            <Text style={styles.textQues}>
              {cuestionarios[currentQuestionsIndex].pregunta}
            </Text>
          </View>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Seleccione una respuesta
          </Text>
          {cuestionarios[currentQuestionsIndex].opciones.map((opcion) => (
            <View>
              <Pressable
                onPress={() => handleOptionPress(opcion)}
                style={[
                  {
                    marginTop: 20,
                    backgroundColor: "white",
                    padding: 10,
                  },
                  selectedOption === opcion && isCorrect
                    ? {
                        borderColor: "green",
                        borderWidth: 2,
                        backgroundColor: "#0EED36",
                      }
                    : selectedOption === opcion && !isCorrect
                    ? {
                        borderColor: "red",
                        borderWidth: 2,
                        backgroundColor: "rgba(255, 0, 0, 0.5)",
                      }
                    : null,
                ]}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  {opcion}
                </Text>
              </Pressable>
            </View>
          ))}
          <Pressable
            style={{
              backgroundColor: "#1485F5",
              height: 50,
              width: width * 0.9,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
            onPress={handleNext}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
              {currentQuestionsIndex === cuestionarios.length - 1
                ? "Finalizar"
                : "Siguiente"}
            </Text>
          </Pressable>
        </>
      ) : (
        <Text>Cargando cuestionarios...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#D0FFE8",
  },
  containerQues: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 20,
  },
  textQues: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  optionRes: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  textOptions: {
    color: "white",
    textAlign: "center",
    paddingRight: 33,
    paddingLeft: 5,
  },
  Boton: {
    backgroundColor: "#1485F5",
    height: 50,
    width: 350,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default Questions;
