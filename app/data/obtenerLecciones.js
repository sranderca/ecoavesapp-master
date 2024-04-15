import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_STORE } from '../../firebaseConfig';

const obtenerLecciones = async () => {
  try {
    const querySnapshot = await getDocs(collection(FIREBASE_STORE, "Lecciones"));
    return querySnapshot;
  } catch (error) {
    console.error("Error al obtener lecciones:", error);
    throw error; 
  }
}

export default obtenerLecciones;