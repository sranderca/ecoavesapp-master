import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  DrawerLayoutAndroid,
} from "react-native";
import obtenerAves from "../data/obtenerAves";

const AvesScreen = ({ navigation }) => {
  const [aves, setAves] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  let drawerRef = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await obtenerAves();
        const avesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Ordenar aves alfabéticamente por nombre
        const avesOrdenadas = avesData.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        setAves(avesOrdenadas);
      } catch (error) {
        console.error("Error al obtener aves:", error);
      }
    };
    fetchData();
  }, []);

  const MenuLateral = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Filtrar por:</Text>
    </View>
  );

  const abrirMenuLateral = () => {
    drawerRef.openDrawer();
  };

  const avesFiltradas = aves.filter((ave) => {
    return ave.nombre.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
    setShowBackButton(!showBackButton);
    setSearchQuery("");
  };

  const toggleButtonVisibility = () => {
    setShowSearchInput(!showSearchInput);
  };

  const AveCard = ({ ave }) => {
    const handlePress = () => {
      navigation.navigate("DetalleAve", { ave });
    };

    return (
      <TouchableOpacity style={styles.card} onPress={() => handlePress()}>
        <Image source={{ uri: ave.imagen }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.nombreComun}>{ave.nombre}</Text>
          <Text style={styles.nombreCientifico}>({ave.nom_cientifico})</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <DrawerLayoutAndroid
      ref={(ref) => (drawerRef = ref)}
      drawerWidth={250}
      drawerPosition={"right"}
      renderNavigationView={() => <MenuLateral />}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/screenGeneral.png")}
          style={[StyleSheet.absoluteFill]}
        />
        <View style={styles.head}>
          {showSearchInput ? (
            <View style={styles.searchContainer}>
              <TouchableOpacity
                onPress={toggleSearchInput}
                style={{ marginRight: 5 }}
              >
                <Image
                  source={require("../../assets/back.png")}
                  style={styles.button}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar ave..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          ) : (
            <Text style={styles.title}>Explorar Aves</Text>
          )}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={toggleButtonVisibility}>
              <Image
                source={require("../../assets/search.png")}
                style={[
                  styles.button,
                  { marginRight: 20 },
                  showSearchInput ? { display: "none" } : null,
                ]}
              />
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={abrirMenuLateral}>
              <Image
                source={require("../../assets/filter.png")}
                style={styles.button}
              />
              </TouchableOpacity> */}
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            DRMI Laguna de Sonso, Guadalajara de Buga
          </Text>
          <Text style={styles.infoText}>198 aves</Text>
        </View>
        <FlatList
          data={avesFiltradas}
          renderItem={({ item }) => <AveCard ave={item} />}
          keyExtractor={(ave) => ave.id}
        />
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    marginTop: 30
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInput: {
    fontSize: 18,
    width: 200,
  },
  titleContainer: {
    flex: 1,
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    marginLeft: 10,
    width: 25,
    height: 25,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  nombreComun: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  nombreCientifico: {
    fontSize: 14,
    color: "#888888",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#66FFA6",
  },
  infoText: {
    fontSize: 14,
    color: "#333333",
    padding: 2,
  },
});

export default AvesScreen;
