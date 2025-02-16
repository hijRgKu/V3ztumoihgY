import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

export default function ExpensesPage({ navigation }) {
  //Declaring constant variables and state hooks
  const [trip, setTrip] = useState("");
  const [listexpenses, setListexpenses] = useState([]);
  const [expenseheader, setExpenseheader] = useState("");

  //Function to call the API that will show all the expenses
  function expensesAPI() {
    fetch("http://localhost:8080/trip?tripName=" + trip)
      .then((result) => result.json())
      .then((json) => {
        console.log(json);
        setListexpenses(json);
        setExpenseheader("Expense - Amount - User");
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Image
          style={styles.logo}
          source={require("./assets/bflogo-nobg.png")}
        />

        {/* Asking the user for a trip name */}

        <Text style={styles.title}>See the current expenses of a trip</Text>

        <View style={styles.textandinput}>
          <Text style={styles.descriptiontext}>Trip name</Text>

          <TextInput
            style={styles.input}
            placeholder="japan2021"
            onChangeText={setTrip}
          />
        </View>

        {/* Calling the API */}
        <TouchableOpacity onPress={expensesAPI} style={styles.touchopa}>
          <Text style={styles.btntext}>SEE EXPENSES</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box2}>
        {/* Showing the result of an array list using a map function. https://reactnativeforyou.com/how-to-use-map-function-in-react-native/ */}
        <Text style={styles.text}>{expenseheader}</Text>
        {listexpenses.map((expense, index) => (
          <Text style={styles.resulttext} key={index}>
            {expense.description} - €{expense.amount} - {expense.user}
          </Text>
        ))}
      </View>
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
  title: {
    fontFamily: "tahoma",
    fontSize: 16,
    margin: "10px",
    color: "white",
  },
  text: {
    fontFamily: "tahoma",
    fontSize: 14,
    margin: "10px",
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 25,
    borderColor: "gray",
    borderWidth: 1,
  },
  textandinput: {
    flexDirection: "row",
  },
  descriptiontext: {
    margin: "10px",
    fontFamily: "tahoma",
    color: "white",
    fontSize: 13,
  },
  resulttext: {
    fontFamily: "tahoma",
    fontSize: 14,
    margin: "5px",
    textAlign: "center",
  },
  touchopa: {
    backgroundColor: "#38b6ff",
    borderRadius: 5,
  },
  btntext: {
    margin: "10px",
    fontFamily: "tahoma",
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: 200,
    height: 75,
    marginVertical: "5px",
  },
  box1: {
    backgroundColor: "#f5304f",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    width: "100%",
    flex: "2",
  },
  box2: {
    backgroundColor: "#00eafa",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "20px",
    width: "100%",
    flex: "4",
  },
});
