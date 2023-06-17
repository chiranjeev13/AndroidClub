import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
} from "react-native";

export default function App() {
  const [todo, setTodo] = useState("");
  const [id, setID] = useState(0);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  // useEffect(async () => {
  //   await fetch("https://jsonplaceholder.typicode.com/todos/1")
  //     .then((response) => response.json())
  //     .then((json) => setTodo(json.title));
  // });

  const fetchTodo = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => setTodo(json.title));
  };

  const postTodo = () => {
    fetch("https://reqres.in/api/users", {
      method: "POST",
      body: {
        name: name,
        job: job,
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setID(json.id);
        ToastAndroid.show(
          json.id + " " + json.name + " " + json.job,
          ToastAndroid.SHORT
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Fetch" onPress={fetchTodo} color="#841584" />
      <Text style={styles.button}>{todo}</Text>
      <Text>{id}</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Job"
        style={styles.input}
        value={job}
        onChangeText={setJob}
      />
      <Button title="Post" onPress={postTodo} color="#841584" />
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
