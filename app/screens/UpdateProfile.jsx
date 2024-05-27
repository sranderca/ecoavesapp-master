import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_STORE } from "../../firebaseConfig";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const UpdateProfile = () => {
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(
    "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar1.jpeg?alt=media&token=5a364dda-9b03-4e21-a385-349a5971aaea"
  );
  const navigation = useNavigation();

  useEffect(() => {
    const createDocument = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user !== null) {
          const uid = user.uid;
          const documentRef = doc(FIREBASE_STORE, "users", uid);
          const data = {
            username: "",
            avatar: "",
            score: 0,
            logros: {
              "LECTION1" : false,
              "LECTION2" : false,
              "LECTION3" : false,
              "LECTION4" : false,
              "LECTION5" : false,
              "LECTION6" : false,
            }
          };

          await setDoc(documentRef, data);

          console.log("Documento creado o actualizado con éxito.");
        } else {
          console.log("No hay usuario autenticado.");
        }
      } catch (error) {
        console.error("Error al crear o actualizar el documento:", error);
      }
    };

    createDocument();
  }, []);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setModalVisible(false);
  };

  const updateUserData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user !== null) {
        const uid = user.uid;
        const documentRef = doc(FIREBASE_STORE, "users", uid);

        // Verificar si el campo username está vacío
        if (!username.trim()) {
          Alert.alert("Por favor, ingrese un nombre de usuario.");
          return; // Salir de la función si no hay un nombre de usuario
        }

        const data = {
          username: username,
          avatar: selectedAvatar,
          score: 0,
          logros: {
            "LECTION1" : false,
            "LECTION2" : false,
            "LECTION3" : false,
            "LECTION4" : false,
            "LECTION5" : false,
            "LECTION6" : false,
          }
        };

        await setDoc(documentRef, data);

        Alert.alert("Datos de usuario actualizados con éxito.");
        navigation.navigate("Tab");
      } else {
        console.log("No hay usuario autenticado.");
      }
    } catch (error) {
      Alert.alert("Error al actualizar los datos del usuario:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/screenGeneral.png")}
        style={[styles.image, StyleSheet.absoluteFill]}
      />
      <BlurView intensity={90}>
        <View style={styles.login}>
          <Text style={styles.text}>Escoge un Avatar</Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Image source={{ uri: selectedAvatar }} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.text}>Nombre de Usuario</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => setUsername(text)}
          ></TextInput>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#606060" }]}
            onPress={updateUserData}
          >
            <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
              Hecho!
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.containerModal}>
          <View
            style={{
              backgroundColor: "#fff",
              width: width * 0.9,
              height: height * 0.33,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexWrap: "wrap",
                width: "88%",
                height: "80%",
              }}
            >
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  handleAvatarSelect(
                    "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar1.jpeg?alt=media&token=5a364dda-9b03-4e21-a385-349a5971aaea"
                  )
                }
              >
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar1.jpeg?alt=media&token=5a364dda-9b03-4e21-a385-349a5971aaea",
                  }}
                  style={{
                    width: width * 0.24,
                    height: height * 0.12,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  handleAvatarSelect(
                    "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar2.jpeg?alt=media&token=87efab4c-c003-4925-ac6f-a705596a25d3"
                  )
                }
              >
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar2.jpeg?alt=media&token=87efab4c-c003-4925-ac6f-a705596a25d3",
                  }}
                  style={{
                    width: width * 0.24,
                    height: height * 0.12,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  handleAvatarSelect(
                    "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar3.jpeg?alt=media&token=c007ebf6-7b4d-4a4d-be15-188104c4e103"
                  )
                }
              >
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar3.jpeg?alt=media&token=c007ebf6-7b4d-4a4d-be15-188104c4e103",
                  }}
                  style={{
                    width: width * 0.24,
                    height: height * 0.12,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  handleAvatarSelect(
                    "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar4.jpeg?alt=media&token=3757151e-33aa-4919-9172-d09a19f5cf57"
                  )
                }
              >
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar4.jpeg?alt=media&token=3757151e-33aa-4919-9172-d09a19f5cf57",
                  }}
                  style={{
                    width: width * 0.24,
                    height: height * 0.12,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  handleAvatarSelect(
                    "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar5.jpeg?alt=media&token=91949f1c-4fc2-4d6e-aadd-10e4ad4da764"
                  )
                }
              >
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar5.jpeg?alt=media&token=91949f1c-4fc2-4d6e-aadd-10e4ad4da764",
                  }}
                  style={{
                    width: width * 0.24,
                    height: height * 0.12,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  handleAvatarSelect(
                    "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar8.jpeg?alt=media&token=3ee93c72-e568-4e3c-af04-7826f4073935"
                  )
                }
              >
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avatar8.jpeg?alt=media&token=3ee93c72-e568-4e3c-af04-7826f4073935",
                  }}
                  style={{
                    width: width * 0.24,
                    height: height * 0.12,
                    borderRadius: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  login: {
    width: 350,
    height: 550,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
    marginVertical: 30,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff90",
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  containerModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginTop: 30,
    alignItems: "center",
  },
  card: {
    padding: 4,
  },
});

export default UpdateProfile;
