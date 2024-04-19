import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import { User, onAuthStateChanged, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import Login from "./app/screens/Login";
import AprenderScreen from "./app/screens/AprenderScreen";
import DetalleAve from "./app/screens/DetalleAve";
import AvesScreen from "./app/screens/AvesScreen";
import { Image } from "react-native";
import MenuLection from "./app/lessoonLection/MenuLection";
import Lection from "./app/lessoonLection/Lection";
import FinalLection from "./app/lessoonLection/FinalLection";
import MenuQuestion from "./app/lessoonLection/MenuQuestion";
import HomeScreen from "./app/screens/HomeScreen";
import UpdateProfile from "./app/screens/UpdateProfile";
import Questions from "./app/lessoonLection/Questions";
import Score from "./app/lessoonLection/Score";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("./assets/book.png")}
              style={{ width: 30, height: 30, tintColor: color }}
            />
          ),
          headerShown: false,
        }}
        name="Aprender"
        component={AprenderScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("./assets/home.png")}
              style={{ width: 30, height: 30, tintColor: color }}
            />
          ),
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("./assets/gorrion.png")}
              style={{ width: 30, height: 30, tintColor: color }}
            />
          ),
          headerShown: false,
        }}
        name="Aves"
        component={AvesScreen}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="Tab"
            component={MyTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="DetalleAve"
          component={DetalleAve}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MenuLection"
          component={MenuLection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Lection"
          component={Lection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FinalLection"
          component={FinalLection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MenuQuestion"
          component={MenuQuestion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Questions"
          component={Questions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Score"
          component={Score}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
