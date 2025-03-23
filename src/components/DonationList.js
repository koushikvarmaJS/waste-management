import {React,useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert
} from 'react-native'
import { MaterialCommunityIcons,FontAwesome,Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { updateStatus } from "../util/Api";


const DonationList = (props) => {
    const {donar,icon,description,color,location,userName,status,timeStamp,setValid} = props
    const [listColor,setColor] = useState('ghostwhite')
    const [modalVisible,setModalVisible] = useState(false)

    const handleAccept = () => {
        const donation = {
            "donar":donar,
            "timeStamp":timeStamp,
        }
        updateStatus(donation).then((data) => {setValid(true)})
        Alert.alert("Donation Accpeted")
        setModalVisible(false)
    }

    const [type,paint] = status ? ['check-circle','green']:['circle','red']
    return (
        <View>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={()=>setModalVisible(!modalVisible)}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.backWrap}>
                        <View style={styles.popWrap}>
                            <Text style={styles.deleteText}>Request this item?</Text>
                            <View style={styles.endButtons}>
                                <Button
                                title="cancel"
                                onPress={()=> setModalVisible(!modalVisible)}
                                />
                                <Button 
                                title="accept"
                                color={'red'}
                                onPress={handleAccept}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <Pressable
            onPressIn={()=>{
                // console.log('just pressed')
                setColor('lightcyan')
            }}
            onPressOut={()=>{
                // console.log('removed finger')
                setColor('ghostwhite')
            }}
            onPress={()=>{console.log('pressed and removed')}}
            onLongPress={()=>{
                console.log('long pressed')
                setModalVisible(true)
            }}
            >
                <View style={[styles.items,styles.shadowProp,{backgroundColor:listColor}]}>
                    <MaterialCommunityIcons name={icon} size={36} color={color} />
                    <LinearGradient colors={['transparent','white']} style={styles.line}/>
                    <View style={styles.textWrap}>
                        <Text style={styles.descWrap}>{description}</Text>
                        <Text style={styles.amountWrap}>
                            <FontAwesome name="map-pin" size={20} color="brown" />
                            {` ${location}`}
                        </Text>
                    </View>
                    <LinearGradient colors={['transparent','white']} style={styles.line}/>
                    <View style={styles.userNameWrap}>
                        <Text style={styles.textWrap}>{userName}</Text>
                        <Feather name={type} size={15} color={paint} style={[{flex:1},{marginLeft:20}]} />
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    items: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:15,
        borderRadius:10
    },
    shadowProp: {  
        shadowOffset: {width: -2, height: 5},  
        shadowColor: 'black',  
        shadowOpacity: 0.2,  
        shadowRadius: 5,
    },
    line:{
        height:'100%',
        width:1,
        marginLeft:10
    }, 
    textWrap:{
        flex:1,
        marginLeft:20
    },
    descWrap:{
        fontSize:22,
        fontWeight:'500'
    },
    amountWrap:{
        fontSize:20,
        fontWeight:'300',
    },
    backWrap: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    popWrap: {
        backgroundColor: "white",
        width: "60%",
        height:100,
        padding: 20,
        borderRadius: 10,
    },
    deleteText :{
        alignSelf:'center',
        fontWeight:'500',
        fontSize:20
    },
    endButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop:10
    },
    userNameWrap:{
        flexDirection: "column",
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})

export default DonationList