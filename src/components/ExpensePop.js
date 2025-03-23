import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'
import UserContext from '../util/User'
import { Picker } from '@react-native-picker/picker'
import CatList from '../util/CatList'
import { addExpense } from '../util/Api'
import ZipList from '../util/ZipList'

const ExpensePop = ({ setChange }) => {
  const { user } = useContext(UserContext)
  const [modalVisible, setModalVisible] = useState(false)
  const [location, setLocation] = useState('')
  const [spentOn, setSpentOn] = useState('')
  const [description, setDescription] = useState('')
  const categories = CatList
  const handleSave = () => {
    console.log("donar:",user)
    const newItem = {
      donar: user,
      location: location,
      category: spentOn,
      description: description
    }
    console.log('Request body:', JSON.stringify(newItem));
    addExpense(newItem).then((data) => {
      setChange(data.rewards)
    })
    Alert.alert('New donation added')
    setModalVisible(false)
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModalVisible(true)
        }}
      >
        <Text style={styles.buttonText}>add</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.backWrap}>
            <View style={styles.popWrap}>
              <TextInput
                style={styles.input}
                placeholder="add location zip"
                placeholderTextColor={'grey'}
                keyboardType="numeric"
                onChangeText={(text) => setLocation(ZipList[text] ?? 'Area 51')}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor={'grey'}
                onChangeText={(text) => setDescription(text)}
              />
              <View style={styles.pickWrap}>
                <Picker
                  selectedValue={spentOn}
                  onValueChange={(itemValue) => setSpentOn(itemValue)}
                  style={[styles.picker]}
                  itemStyle={[{ textAlign: 'center' }, { fontSize: 20 }]}
                >
                  <Picker.Item label="Select Category" value="" />
                  {categories.map((category, index) => (
                    <Picker.Item
                      label={category}
                      value={category}
                      key={index}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.endButtons}>
                <Button
                  title="Cancel"
                  color={'#e74c3c'}
                  onPress={() => setModalVisible(!modalVisible)}
                />
                <Button title="Save" color={'#3498db'} onPress={handleSave} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: 50,
    height: 40
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center'
  },
  backWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  popWrap: {
    backgroundColor: 'white',
    width: '75%',
    padding: 20,
    borderRadius: 10
  },
  input: {
    borderColor: 'grey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  pickWrap: {
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
    borderColor: 'grey'
  },
  picker: {
    height: 100,
    justifyContent: 'center'
  },
  endButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default ExpensePop
