import React from "react";
import { View,Text,StyleSheet } from "react-native";

const DayDate = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const day = days[currentDate.getDay()]
  const date = currentDate.getDate()
  const month = months[currentDate.getMonth()]
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{month} {date}</Text>
      <Text style={styles.day}>{day}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      alignItems:'flex-end'
    },
    date:{
        fontSize:20,
        fontWeight:'300',
    },
    day:{
        fontSize:30,
        fontWeight:'500'
    }
})
export default DayDate;