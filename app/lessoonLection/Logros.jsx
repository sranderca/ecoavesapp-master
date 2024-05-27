import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_STORE } from "../../firebaseConfig";

const lectionNames = {
  LECTION1: "La alimentación de los Colibries.",
  LECTION2: "Las aves y las semillas.",
  LECTION3: "Ayudando desde nuestro hogar.",
  LECTION4: "La importancia ecológica de las aves.",
  LECTION5: "El impacto humano en la Laguna.",
  LECTION6: "Aviturismo responsable",
};

const Logros = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [logros, setLogros] = useState({});

  useEffect(() => {
    const fetchUserLogros = async () => {
      if (user) {
        try {
          const userDocRef = doc(FIREBASE_STORE, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setLogros(userDoc.data().logros || {});
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error al obtener los logros del usuario:", error);
        }
      }
    };

    fetchUserLogros();
  }, [user]);

  const completedLogros = Object.entries(logros)
    .filter(([key, value]) => value === true)
    .map(([key]) => key);

  return (
    <>
      {completedLogros.length > 0 ? (
        completedLogros.map((logro) => (
          <View key={logro} style={styles.logroContainer}>
            <Image
              source={require("../../assets/insignia.png")}
              style={styles.insignia}
            />
            <Text style={styles.logroText}>{lectionNames[logro]}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noLogrosText}>
          Para conseguir Logros completa correctamente los cuestionarios
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  logroContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#D0FFE8",
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
    flexDirection: 'row'
  },
  logroText: {
    fontSize: 16,
  },
  noLogrosText: {
    fontSize: 16,
    color: "gray",
    marginVertical: 20,
    textAlign: "center",
  },
  insignia: {
    width: 30,
    height: 30,
  },
});

export default Logros;
