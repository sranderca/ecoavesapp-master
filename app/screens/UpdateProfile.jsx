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

const UpdateProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/bird1.png?alt=media&token=5f11fb35-da49-44df-9d14-80fc557e9ffc");
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
            profileComplete: true,
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
        const data = {
          username: username,
          avatar: selectedAvatar,
          score: 0,
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
            <Image
              source={
                { uri: selectedAvatar } 
              }
              style={styles.avatar}
            />
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
          <View style={styles.modal}>
            <View
              style={{
                flexWrap: "wrap",
                paddingVertical: 20,
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  handleAvatarSelect(
                    "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/bird1.png?alt=media&token=5f11fb35-da49-44df-9d14-80fc557e9ffc"
                  )
                }
              >
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/bird1.png?alt=media&token=5f11fb35-da49-44df-9d14-80fc557e9ffc",
                  }}
                  style={styles.avatarOption}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleAvatarSelect(
                    "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/bird2.png?alt=media&token=2740989d-3371-4b4a-a1ad-c3ac7c946c87"
                  )
                }
              >
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/bird2.png?alt=media&token=2740989d-3371-4b4a-a1ad-c3ac7c946c87",
                  }}
                  style={styles.avatarOption}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleAvatarSelect(
                    "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/bird3.png?alt=media&token=7c58433d-c841-4e69-8cb9-21550bf1bbb1"
                  )
                }
              >
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/bird3.png?alt=media&token=7c58433d-c841-4e69-8cb9-21550bf1bbb1",
                  }}
                  style={styles.avatarOption}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleAvatarSelect(
                    "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/bird4.png?alt=media&token=e8846bd1-ad8a-4d4a-8958-37b47054967e"
                  )
                }
              >
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/bird4.png?alt=media&token=e8846bd1-ad8a-4d4a-8958-37b47054967e",
                  }}
                  style={styles.avatarOption}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleAvatarSelect(
                    "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/bird5.png?alt=media&token=43a180ce-bdf5-4487-a50b-fe8425002802"
                  )
                }
              >
                <Image
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/bird5.png?alt=media&token=43a180ce-bdf5-4487-a50b-fe8425002802",
                  }}
                  style={styles.avatarOption}
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
  avatarOption: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  containerModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    width: "77%",
    height: "30%",
    borderRadius: 10,
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
});

export default UpdateProfile;
