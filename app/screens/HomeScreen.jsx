import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  TouchableHighlight,
  Modal,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_STORE } from "../../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Drawer } from "react-native-drawer-layout";
import Logros from "../lessoonLection/Logros";

const noticias = [
  {
    id: 1,
    content:
      "Es posible su ingreso informando a la CVC – DAR Centro Sur. Se puede visitar el Centro de Educación Ambiental Buitre de Ciénaga que hace parte del Área protegida",
  },
  {
    id: 2,
    content:
      "El DRMI Laguna de Sonso desempeña un papel crucial en la conservación de la avifauna, no solo en el alto valle geográfico del Cauca, sino también en todo el suroccidente colombiano, albergando un número importante de especies migratorias transcontinentales. Además, en este lugar se encuentra una de las dos poblaciones del Buitre de ciénaga (Anhima cornuta)  ",
  },
  {
    id: 3,
    content:
      "El DRMI - Laguna Sonso está situado en el municipio de Guadalajara de Buga, integrado en la Dirección Ambiental Regional (DAR) Centro Sur y la Unidad de Gestión de Cuencas de Guadalajara-San Pedro. Este área es parte del complejo de humedales de la cuenca alta del río Cauca, una subcuenca del río Magdalena. Se encuentra en el centro del Valle del Cauca, en los corregimientos de El Porvenir y El Vínculo.",
  },
  {
    id: 4,
    content:
      "La Laguna de Sonso, en Buga, Valle del Cauca, es un valioso humedal y el último remanente nativo de ecosistema lagunar en la región. Ubicada en el Bosque Seco Tropical Inundable, forma parte de la cuenca alta del río Cauca, en el sistema hidrográfico del río Magdalena. Su importancia radica en la conservación de la biodiversidad local y su ubicación central en el Valle del Cauca",
  },
  {
    id: 5,
    content:
      "Pajarear es una actividad que reta tus sentidos. Un sonido extraño, algo que pasa corriendo detrás de ti. una rama que se quiebra en lo alto de un árbol, todo puede indicar la presencia de algún ave sorprendente a nuestro alrededor",
  },
];

const galeria = [
  {
    id: 1,
    content:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/laguna.jpg?alt=media&token=dae68928-67aa-466c-9e87-9014e92fbf30",
  },
  {
    id: 2,
    content:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avelaguna.jpg?alt=media&token=ea339dd2-b532-42cb-9b22-b100662c0af7",
  },
  {
    id: 3,
    content:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avelaguna2.jpg?alt=media&token=2233ac04-5ab6-4db9-86c4-2d773a5fa6f7",
  },
  {
    id: 4,
    content:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/avelaguna3.jpg?alt=media&token=a29fbb5a-32dc-4861-84f1-6134e7ac9008",
  },
  {
    id: 5,
    content:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/Laguna-de-Sonso-5_1.jpg?alt=media&token=ef48818b-4670-4fed-be94-5c6e55eaab49",
  },
  {
    id: 6,
    content:
      "https://firebasestorage.googleapis.com/v0/b/login-ecoaves.appspot.com/o/Laguna-Sonso-Monica-Hernandez_1.jpg?alt=media&token=85d1f00a-9224-4d4e-a999-df7c7a9fa86c",
  },
];

const HomeScreen = () => {
  const auth = getAuth();
  const [users, setUsers] = useState([]);
  const user = auth.currentUser;
  const [activeIndex, setActiveIndex] = useState(0);
  const { width } = Dimensions.get("window");
  const { height } = Dimensions.get("window");
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isLogrosModalVisible, setLogrosModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = React.useState(false);
  let uid = null;
  let email = null;

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

  const renderNoticia = ({ item }) => (
    <View style={styles.noticiaContainer}>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  const handleImagePress = (imageUri) => {
    setSelectedImage(imageUri);
    setImageModalVisible(true);
  };

  const closeModal = () => {
    setImageModalVisible(false);
  };

  const renderImagen = ({ item }) => (
    <View style={styles.noticiaContainer}>
      <TouchableOpacity onPress={() => handleImagePress(item.content)}>
        <Image
          source={{ uri: item.content }}
          style={{ width: width * 0.8, height: height * 0.24 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );

  const handleLinkPress = () => {
    const url = "https://www.birds.cornell.edu/home/terms-of-use/";
    Linking.openURL(url);
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

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % noticias.length;
      setActiveIndex(nextIndex);
    }, 5000); // Cambiar la noticia cada 5 segundos

    return () => clearInterval(interval);
  }, [activeIndex]);

  const navigationView = () => (
    <View style={[styles.containerDrawer, styles.navigationContainer]}>
      <TouchableOpacity
        style={{ marginRight: 240 }}
        onPress={() => setOpen(false)}
      >
        <Image
          source={require("../../assets/cruz.png")}
          style={{ width: width * 0.08, height: height * 0.04 }}
        />
      </TouchableOpacity>
      <Image
        source={{ uri: users.avatar }}
        style={{ width: 200, height: 200, marginTop: 30, borderRadius: 20 }}
      />
      <Text style={styles.text}>{email}</Text>
      <Text style={styles.text}>{users.username}</Text>
      <Text style={styles.text}>Score: {users.score}</Text>

      <TouchableOpacity
        style={{ bottom: -30, alignItems: "center" }}
        onPress={() => setLogrosModalVisible(true)}
      >
        <Text style={styles.text}>Logros</Text>
        <Image
          source={require("../../assets/insig.png")}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      <Text
        style={{
          bottom: 200,
          position: "absolute",
          textAlign: "center",
          padding: 30,
          flexWrap: "wrap",
        }}
      >
        Las imágenes de las aves fueron obtenidas de eBirds y están sujetas a
        los términos de uso y derechos de autor de{" "}
        <TouchableOpacity onPress={handleLinkPress}>
          <Text style={styles.link}>Cornell Lab of Ornithology</Text>
        </TouchableOpacity>
      </Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          position: "absolute",
          bottom: 100,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/logout.png")}
          style={{ width: width * 0.08, height: height * 0.04 }}
        />
        <Text style={{ marginLeft: 5, fontSize: 16, fontWeight: "500" }}>
          Cerrar Sesion
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={navigationView}
      drawerPosition="right"
    >
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => setOpen((prevOpen) => !prevOpen)}
          style={styles.header}
        >
          <Image
            source={require("../../assets/menu.png")}
            style={{ width: width * 0.08, height: height * 0.04 }}
          />
        </TouchableOpacity>
        <View style={styles.containerHeader}>
          <Text style={{ fontSize: 26, fontWeight: 700, textAlign: "center" }}>
            EcoAves: Un prototipo de aplicacion movil para la conservacion de
            las aves de la Laguna de Sonso
          </Text>
          <Text style={{ textAlign: "center", marginTop: 5, fontSize: 15 }}>
            ¡Bienvenido a EcoAves! Una aplicación móvil diseñada para la
            conservación y protección de las aves que habitan en la hermosa
            Laguna de Sonso, ubicada en el Valle del Cauca, Colombia. Con
            EcoAves, podrás explorar la riqueza natural de este ecosistema
            único, aprender sobre las diversas especies de aves que lo habitan y
            contribuir a su preservación.
          </Text>
        </View>
        <View style={styles.containerNews}>
          <Text
            style={{
              marginHorizontal: width * 0.08,
              fontSize: 14,
              fontWeight: "400",
              color: "white",
            }}
          >
            Interes
          </Text>
          <Carousel
            layout={"default"}
            data={noticias}
            renderItem={renderNoticia}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={width * 0.9}
            onSnapToItem={(index) => setActiveIndex(index)}
            autoplay={true} // Desactivamos el autoplay ya que lo manejamos manualmente
            autoplayInterval={5000} // Intervalo de cambio de noticia (en milisegundos)
            loop={true} // Hacer que el carrusel vuelva a la primera noticia al finalizar
          />
          <Text
            style={{
              marginHorizontal: width * 0.08,
              fontSize: 14,
              fontWeight: "400",
              color: "white",
            }}
          >
            Galeria de fotos
          </Text>
          <Carousel
            layout={"default"}
            data={galeria}
            renderItem={renderImagen}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={width * 0.9}
            onSnapToItem={(index) => setActiveIndex(index)}
            autoplay={true} // Desactivamos el autoplay ya que lo manejamos manualmente
            autoplayInterval={5000} // Intervalo de cambio de noticia (en milisegundos)
            loop={true} // Hacer que el carrusel vuelva a la primera noticia al finalizar
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={isImageModalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
              <TouchableHighlight
                onPress={closeModal}
                style={styles.closeButton}
              >
                <Image
                  source={require("../../assets/cruz.png")}
                  style={{ width: 25, height: 25 }}
                />
              </TouchableHighlight>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={isLogrosModalVisible}
            onRequestClose={() => setLogrosModalVisible(false)}
          >
            <View style={styles.containerModal}>
              <View
                style={{
                  backgroundColor: "#fff",
                  width: width * 0.9,
                  height: height * 0.6,
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ bottom: 50, fontSize: 18, fontWeight: 600 }}>Logros</Text>
                <Logros user={user} />
                <TouchableHighlight
                  onPress={() => setLogrosModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Image
                    source={require("../../assets/cruz.png")}
                    style={{ width: 25, height: 25 }}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0FFE8",
  },
  containerDrawer: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  header: {
    left: 10,
    top: 5,
  },
  containerHeader: {
    paddingHorizontal: 20,
    top: 10,
    alignItems: "center",
  },
  avatar: {
    height: 80,
    width: 80,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  noticiaContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    textAlign: "justify",
  },
  containerNews: {
    marginTop: 20,
    backgroundColor: "#1485F5",
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  containerModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
