import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
} from "react-native";

export default function App() {
  const [id, setID] = useState(2);
  const [getName, setGetName] = useState("");
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const fetchTodo = () => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then((response) => response.json())
      .then((json) =>
        setGetName(json.data.first_name + " " + json.data.last_name)
      );
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
        ToastAndroid.show(
          "Created object at id: " + json.id,
          ToastAndroid.SHORT
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>GET method!</Text>
      <TextInput
        placeholder="ID"
        style={styles.input}
        value={id}
        onChangeText={setID}
      />
      <Button title="Fetch" onPress={fetchTodo} color="#841584" />
      <Text>Name: {getName}</Text>
      <Text style={styles.header}>POST method!</Text>
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
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue",
  },
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
