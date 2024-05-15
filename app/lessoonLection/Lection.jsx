import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_STORE } from "../../firebaseConfig";

const Lection = ({ route, navigation }) => {
  const { lection } = route.params;
  const idLection = lection.id;
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionLections, setSectionLections] = useState([]);
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("window");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIREBASE_STORE, "Lecciones", idLection, "SectionLection")
        );
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setSectionLections(data);
      } catch (error) {
        console.error("Error al obtener las sub lecciones:", error);
      }
    };
    fetchData();
  }, []);

  const renderSectionLection = ({ item }) => (
    <View style={styles.birdCard}>
      <Image source={{ uri: item.image }} style={styles.birdImage} />
      <View style={styles.birdInfo}>
        <Text style={styles.birdName}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {activeIndex === sectionLections.length - 1 && (
          <TouchableOpacity style={styles.button} onPress={handleFinalizar}>
            <Text style={styles.buttonText}>Finalizar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const handleFinalizar = () => {
    navigation.navigate("FinalLection", { lection });
  };

  return (
    <View style={styles.container}>
      <Pagination
        dotsLength={sectionLections.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationDotInactive}
        inactiveDotOpacity={1}
        inactiveDotScale={1.8}
      />
      {sectionLections.length > 0 && (
        <Carousel
          layout={"default"}
          data={sectionLections}
          renderItem={renderSectionLection}
          keyExtractor={(item) => item.id}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={300}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
  },
  birdCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
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
    backgroundColor: "#D0FFE8",
  },
  birdName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: -10
  },
  description: {
    lineHeight: 17,
    textAlign: 'justify'
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 260,
    height: 50,
    backgroundColor: "#66FFA6",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  paginationContainer: {
    paddingTop: 90,
    paddingBottom: 20,
  },
  paginationDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 8,
    backgroundColor: "#66FFA6",
  },
  paginationDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: "#ccc",
  },
});

export default Lection;
