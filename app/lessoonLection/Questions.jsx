import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import { FIREBASE_STORE } from "../../firebaseConfig";
import QuestionItem from "./QuestionItem";

const Questions = ({ route }) => {
  const { lection } = route.params;
  const idLection = lection.id;
  const [cuestionarios, setCuestionarios] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const { height, width } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(false);
  const listRef = useRef();

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
      } catch (error) {
        console.error("Error al obtener los cuestionarios:", error);
      }
    };
    fetchData();
  }, []);

  const OnSelectOption = (index, x) => {
    const tempData = cuestionarios;
    tempData.map((item, ind) => {
      if (index == ind) {
        if (item.marcada !== -1) {
          item.marcada = -1;
        } else {
          item.marcada = x;
        }
      }
    });
    let temp = [];
    tempData.map((item) => {
      temp.push(item);
    });
    setCuestionarios(temp);
  };

  const getTextScore = () => {
    let marks = 0;
    cuestionarios.map((item) => {
      if (item.marcada !== -1) {
        marks = marks + 5;
      }
    });
    return marks;
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../../assets/screenGeneral.png")}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ marginTop: 30 }}>
        <Text style={styles.title}>Pregunta {currentIndex}</Text>
        <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x / width + 1;
            setCurrentIndex(x.toFixed(0));
          }}
          data={cuestionarios}
          renderItem={({ item, index }) => {
            return (
              <QuestionItem
                data={item}
                selectedOption={(x) => {
                  OnSelectOption(index, x);
                }}
              />
            );
          }}
        />
      </View>
      <View style={styles.containerBotons}>
        <TouchableOpacity
          style={styles.BotonLeft}
          onPress={() => {
            if (currentIndex > 1) {
              listRef.current.scrollToIndex({
                animated: true,
                index: currentIndex - 2,
              });
            }
          }}
        >
          <Text style={{ fontWeight: "600" }}>Anterior</Text>
        </TouchableOpacity>
        {currentIndex == 3 ? (
          <TouchableOpacity
            style={styles.BotonRightSend}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={{ fontWeight: "600" }}>Enviar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.BotonRight}
            onPress={() => {
              if (cuestionarios[currentIndex - 1].marcada !== -1) {
                if (currentIndex < cuestionarios.length) {
                  listRef.current.scrollToIndex({
                    animated: true,
                    index: currentIndex,
                  });
                }
              }
            }}
          >
            <Text style={{ fontWeight: "600" }}>Siguiente</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "90%",

              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "800",
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              Text Score
            </Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "800",
                alignSelf: "center",
                marginTop: 20,
                color: "green",
              }}
            >
              {getTextScore()}
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 20,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    justifyContent: "center",
    alignSelf: "center",
  },
  containerBotons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  BotonLeft: {
    backgroundColor: "#66FFA6",
    height: 50,
    width: 100,
    borderRadius: 10,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  BotonRight: {
    backgroundColor: "#66FFA6",
    height: 50,
    width: 100,
    borderRadius: 10,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  BotonRightSend: {
    backgroundColor: "#265921",
    height: 50,
    width: 100,
    borderRadius: 10,
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
});

export default Questions;
