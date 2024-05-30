import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Card from "./Cards";

const cardsBirds = [
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/APO85.jpg?alt=media&token=7120e596-b459-4a6f-be23-76a9d4018d7c",
    id: 1,
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/SCO36.jpg?alt=media&token=55155801-32ff-4c8e-a630-197b26f1be8a",
    id: 2,
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/SCO31.jpg?alt=media&token=212303af-7955-4e4e-8f59-b890e5703a92",
    id: 3,
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/PHA15.jpg?alt=media&token=64b90a6a-8f61-40ac-8476-71cafd72b311",
    id: 4,
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/STRIG92.jpg?alt=media&token=99aeb166-5141-4298-86f6-8495aa0df6ab",
    id: 5,
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/patobrasilero.jpg?alt=media&token=59305339-3c71-45d1-8f47-e6b1a5151e3a",
    id: 6,
  },
];

const cardsHabitats = [
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/arbusto.png?alt=media&token=a3426bf4-3ddb-4beb-ab28-c94b5a3af9ac",
    id: 1,
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/pantano.png?alt=media&token=f8a0d5fc-247e-487e-af74-9542e8ef22c0",
    id: 2,
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/campo.png?alt=media&token=ba58cf88-c19c-47b4-9b45-593bf096fcd7",
    id: 3,
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/rio.png?alt=media&token=153cd6ab-2021-46d3-bd0d-2abb04edd890",
    id: 4,
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/arbol.png?alt=media&token=7bf5deb8-a4f7-4d8b-b0d6-262c3a22f579",
    id: 5,
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/laguna.png?alt=media&token=3552251b-28ad-416d-ac4e-9fd4e3c17b12",
    id: 6,
  },
];

const shuffle = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Habitats = ({ navigation }) => {
  const [board, setBoard] = useState(() =>
    shuffle([...cardsBirds, ...cardsHabitats])
  );
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (selectedCards.length < 2) return;
    const [firstIndex, secondIndex] = selectedCards;
    if (
      board[firstIndex].id === board[secondIndex].id &&
      firstIndex !== secondIndex
    ) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
      setScore(score + 5); // Aumentar el score en 5 puntos por cada match
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    if (
      selectedCards.length >= 2 ||
      selectedCards.includes(index) ||
      matchedCards.includes(index)
    )
      return;
    setSelectedCards([...selectedCards, index]);
  };

  const didPlayerWin = () =>
    matchedCards.length === cardsBirds.length + cardsHabitats.length;

  const resetGame = () => {
    setMatchedCards([]);
    setScore(0);
    setSelectedCards([]);
  };

  const handleFinish = () => {
    navigation.navigate("Score2", { score: score });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {didPlayerWin()
          ? "¡Felicidades! Has ganado."
          : "Empareja las aves con su habitat correspondiente!"}
      </Text>
      <Text style={{ color: "white", fontSize: 20 }}>Score: {score}</Text>
      <View style={styles.board}>
        {board.map((card, index) => (
          <Card
            key={index}
            imageUrl={card.image}
            isTurnedOver={
              selectedCards.includes(index) || matchedCards.includes(index)
            }
            onPress={() => handleTapCard(index)}
          />
        ))}
      </View>
      {didPlayerWin() && (
        <View style={styles.containerBoton}>
          <TouchableOpacity onPress={resetGame} style={styles.BotonRes}>
            <Text style={styles.text}>Reintentar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFinish} style={styles.BotonFin}>
            <Text style={styles.text}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1485F5",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 40,
    textAlign: "center",
  },
  containerBoton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 50,
    width: "100%",
  },
  BotonRes: {
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  BotonFin: {
    marginRight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
});

export default Habitats;
