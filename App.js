import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [todo, setTodo] = useState("");
  // const [id, setID] = useState(0);
  const [name, setName] = useState("");

  // useEffect(async () => {
  //   await fetch("https://jsonplaceholder.typicode.com/todos/1")
  //     .then((response) => response.json())
  //     .then((json) => setTodo(json.title));
  // });

  const fetchTodo = () => {
    fetch("https://reqres.in/api/users/2")
      .then((response) => response.json())
      .then((json) => {
        setName(json.data.first_name);
        console.log(json);
      });
  };

  return (
    <View style={styles.container}>
      <Text>GET Method</Text>
      <Button title="Fetch" onPress={fetchTodo} color="#841584" />
      <Text style={styles.button}>{todo}</Text>
      <Text>Name: {name}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 10,
  },
  input: {
    borderWidth: 2,
    width: 200,
    margin: 10,
    borderStyle: "solid",
    borderColor: "black",
  },
});
