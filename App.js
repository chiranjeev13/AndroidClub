import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";

export default function App() {
  const [id, setID] = useState(2);
  const [getName, setGetName] = useState("");
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const [showMethod, setShowMethod] = useState(null);

  const fetchUser = () => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then((response) => response.json())
      .then((json) =>
        setGetName(json.data.first_name + " " + json.data.last_name)
      );
  };

  const AddUser = () => {
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

  const UpdateUser = () => {
    fetch("https://reqres.in/api/users/" + id, {
      method: "PUT",
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
        ToastAndroid.show("Updated object", ToastAndroid.SHORT);
      });
  };

  const DeleteUser = () => {
    fetch("https://reqres.in/api/users/" + id, {
      method: "DELETE",
    }).then((response) => {
      console.log(response);
      ToastAndroid.show("Deleted object", ToastAndroid.SHORT);
    });
  };

  return (
    <View style={styles.container}>
      {showMethod === null && <Text style={styles.header}>API</Text>}
      {showMethod === "GET" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>GET method!</Text>
          <TextInput
            placeholder="ID"
            style={styles.input}
            value={id}
            onChangeText={setID}
          />
          <Button
            title="Fetch"
            style={styles.button}
            onPress={fetchUser}
            color="#6EB4D5"
          />
          <Text>Name: {getName}</Text>
        </View>
      )}
      {showMethod === "POST" && (
        <View style={styles.methodContainer}>
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
          <Button
            title="Post"
            style={styles.button}
            onPress={AddUser}
            color="#6EB4D5"
          />
        </View>
      )}

      {showMethod === "PUT" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>PUT method!</Text>
          <TextInput
            placeholder="Id"
            style={styles.input}
            value={id}
            onChangeText={setID}
          />
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
          <Button
            title="Post"
            style={styles.button}
            onPress={UpdateUser}
            color="#6EB4D5"
          />
        </View>
      )}
      {showMethod === "DELETE" && (
        <View style={styles.methodContainer}>
          <Text style={styles.header}>DELETE method!</Text>
          <TextInput
            placeholder="Id"
            style={styles.input}
            value={id}
            onChangeText={setID}
          />
          <Button
            title="Post"
            style={styles.button}
            onPress={DeleteUser}
            color="#6EB4D5"
          />
        </View>
      )}
      <View style={styles.optionsButton}>
        <Button
          title="GET"
          style={styles.button}
          onPress={() => setShowMethod("GET")}
          color="#6EB4D5"
        />

        <Button
          title="POST"
          style={styles.button}
          onPress={() => setShowMethod("POST")}
          color="#6EB4D5"
        />

        <Button
          title="PUT"
          style={styles.button}
          onPress={() => setShowMethod("PUT")}
          color="#6EB4D5"
        />

        <Button
          title="DELETE"
          style={styles.button}
          onPress={() => setShowMethod("DELETE")}
          color="#6EB4D5"
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#335EA1",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 40,
  },
  input: {
    borderWidth: 2,
    width: 300,
    margin: 10,
    borderStyle: "solid",
    borderColor: "black",
    fontSize: 20,
    padding: 10,
  },

  optionsButton: {
    flexDirection: "row",
    gap: 10,
    position: "absolute",
    bottom: 60,
  },
  methodContainer: {
    position: "absolute",
    top: 70,
  },
});
