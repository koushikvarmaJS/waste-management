import React from "react";
import { View,Text,StyleSheet } from "react-native";
import Icon from "./Icon";

const AppName = () => {
    return (
        <View style={styles.container}>
          <View style={styles.moneyWrap}>
            <Text style={styles.money}>GIVE</Text>
            <Icon name={"handshake-o"} size={20} color={'green'}/>
          </View>
          <Text style={styles.manager}>GRID</Text>
        </View>
      )
}

const styles = StyleSheet.create({
    container:{
      alignItems:'flex-start'
    },
    moneyWrap:{
      flexDirection:'row',
      alignItems:'center',
    },
    money:{
        fontSize:20,
        fontWeight:'350',
        color:'darkgreen',
        marginRight:5
    },
    manager:{
        fontSize:30,
        fontWeight:'500',
    }
})
export default AppName;