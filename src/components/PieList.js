import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PieColors from "../util/PieColors";

const PieList = (props) => {
  const { color, category, location, percentage } = props;
  const textColor = PieColors[category].text;

  return (
    <View style={[styles.list,styles.shadowProp, { backgroundColor: color }]}>
      <View style={styles.tableData}>
        <Text style={{ color: textColor }}>{category} </Text>
        <Text style={{ color: textColor }}>{location}</Text>
        <Text style={{ color: textColor }}>{percentage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 20,
    justifyContent: 'space-around',
    borderRadius:10,
  },
  tableData: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  shadowProp: {
    shadowOffset: {width: -2, height: 5},  
    shadowColor: 'black',  
    shadowOpacity: 0.2,  
    shadowRadius: 5,
  },
});

export default PieList;