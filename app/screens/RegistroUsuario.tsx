import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';

export default function RegistroUsuario() {

  const [avatar, setAvatar] = useState('https://cdn-icons-png.flaticon.com/512/5869/5869029.png');
  const [avatarActual, setAvatarActual] = useState(1);

  const handleAvatarChange = (newAvatarIndex) => {
    // Ensure index is within valid range
    if (newAvatarIndex >= 1 && newAvatarIndex <= avatars.length) {
      setAvatar(avatars[newAvatarIndex - 1].imagen); // Access image URL based on index
      setAvatarActual(newAvatarIndex);
    } else {
      console.warn('Invalid avatar index:', newAvatarIndex); // Handle invalid input
    }
  };

  const avatars = [
    {
      imagen: 'https://cdn-icons-png.flaticon.com/512/5869/5869029.png',
    },
    {
      imagen: 'https://cdn-icons-png.flaticon.com/512/1152/1152217.png',
    },
    {
      imagen: 'https://cdn-icons-png.flaticon.com/512/12468/12468555.png',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarprincipalContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </View>
        </View>
        <View style={styles.options}>
          {avatars.map((avatar, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAvatarChange(index + 1)}
              style={[styles.avatarSel, avatarActual === index + 1 && styles.avatarActivo]}>
              <View style={styles.containerAvatar}>
                <Image source={{ uri: avatar.imagen }} style={styles.imagenAvatar} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Nombre de usuario</Text>
        <TextInput style={styles.input}
          placeholder='Ingresa tu nombre de usuario'
        />
        <Text style={styles.label}>Puntaje</Text>
        <TextInput style={styles.input}
          editable={false}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input}
          editable={false}
        />
        <View style={styles.campo}>
            <TouchableOpacity style={styles.button} onPress={() => console.log("pressed" as string)}>
              <Text style={styles.label}>Press Here</Text>
            </TouchableOpacity>            
          </View> 
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: "#D0FFE8",
  },
  form: {
    backgroundColor: "#8FE18D",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold"
  },
  input: {
    height: 40,
    borderColor: "#3D3D3D",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5
  },
  button: {
    //flexDirection: 'row',
    //bottom: 20,   
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 8,
    height: 40,
    fontWeight: 'bold',
    fontSize: 16,
    //width: 40,
  },
  campo: {
    //flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 40,
    paddingHorizontal: 80
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,  
  },
  avatarprincipalContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderColor: '#000',
    borderWidth: 2,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 140,
    height: 140,
    resizeMode: 'cover',
  },
  options: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  avatarSel: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 2,
    marginRight: 10,
    marginLeft: 10,
  },
  avatarActivo: {
    backgroundColor: '#0077b6',
  },
  imagenAvatar: {
    width: undefined,
    height: undefined,
    flex: 1,
    borderRadius: 10,
    // width: undefined, 
    // height: undefined,
    resizeMode: 'cover',
    //zIndex: 1,
  },
  containerAvatar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
})