import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_STORE } from '../../firebaseConfig';

const obtenerAves = async () => {
  try {
    const querySnapshot = await getDocs(collection(FIREBASE_STORE, "Aves"));
    return querySnapshot;
  } catch (error) {
    console.error("Error al obtener aves:", error);
    throw error; 
  }
}

export default obtenerAves;