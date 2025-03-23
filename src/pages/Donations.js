import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native'
import { getDonations } from '../util/Api'
import DonationList from '../components/DonationList'
import IconList from '../util/IconList'
import UserContext from '../util/User'

const Donations = () => {
  const { user } = useContext(UserContext)
  const [dataList, setDataList] = useState([])
  const [valid, setValid] = useState(true)
  const [loading, setLoading] = useState(false)
  // console.log(user)
  const fetchData = () => {
    setLoading(true)
    getDonations(user).then((data) => {
      console.log('datalist',data)
      if (data) {
        setDataList(data)
      }
      setLoading(false)
    })
  }
  useEffect(() => {
    if (valid) {
      fetchData()
      setValid(false)
    }
  }, [valid])

  const renderItem = ({ item }) => {
    const category = item.category
    const { icon, color } = IconList[category]
    return (
      <DonationList
        donar={item.donarId}
        icon={icon}
        color={color}
        description={item.description}
        location={item.location}
        userName={item.userName}
        status={item.status}
        timeStamp={item.timeStamp}
        setValid={setValid}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.wrap, { marginTop: 40 }]}>
          <Text style={styles.donationText}>DONATIONS</Text>
      </View>
      <View style={[{ padding: 10}]}>
        {loading ? (
          <ActivityIndicator size={'large'} color={'black'} />
        ) : dataList.length === 0 ? (
          <View style={styles.noTransactionsWrap}>
            <Text style={[{fontSize:30},{color:'darkred'}]}>No recent donations</Text>
          </View>
        ) : (
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={(item) => item.timeStamp}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            contentContainerStyle={{ paddingBottom: 200 }}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lavender'
    // alignItems:'center'
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  donationText: {
    fontSize: 20,
    fontWeight: '500'
  },
  balanceStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  balanceValue: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    marginLeft: 5
  },
  spendText: {
    fontSize: 24,
    fontWeight: '500'
  },
  noTransactionsWrap:{
    justifyContent: 'center', 
    alignItems: 'center' , 
    marginTop: 100
  }
})

export default Donations
