import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";

const { height, width } = Dimensions.get("window");

const QuestionItem = ({ data, selectedOption }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerQues}>
        <Text style={styles.textQues}>{data.pregunta}</Text>
      </View>
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        Seleccione una respuesta
      </Text>
      <View style={styles.containerOptions}>
        <FlatList
          data={data.opciones}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 90,
                  elevation: 3,
                  marginTop: 10,
                  marginBottom: 10,
                  alignSelf: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                  flexDirection: "row",
                  borderRadius: 10,
                  backgroundColor:
                    data.marcada == index + 1 ? "#265921" : "#333333",
                }}
                onPress={() => {
                  selectedOption(index + 1);
                }}
              >
                <View style={styles.optionRes}>
                  <Text style={{ fontWeight: "600" }}>
                    {index == 0
                      ? "A"
                      : index == 1
                      ? "B"
                      : index == 2
                      ? "C"
                      : "D"}
                  </Text>
                </View>
                <Text style={styles.textOptions}>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    padding: 20,
  },
  containerQues: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    marginBottom: 20,
  },
  textQues: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 20,
    marginRight: 20,
  },
  containerOptions: {
    marginTop: 20,
    backgroundColor: "#D3D3D3",
    padding: 10,
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
});

export default QuestionItem;
