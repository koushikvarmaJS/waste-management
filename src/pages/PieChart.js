import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, FlatList, TouchableOpacity, Text, View, SafeAreaView } from 'react-native'
import PieChart from 'react-native-pie-chart'
import { AntDesign } from '@expo/vector-icons'
import DateDisplay from '../util/DateDisplay'
import PieList from '../components/PieList'
import { getTransactionAmountByCategory } from '../util/Api'
import { getFormattedDate } from '../util/DateConversion'
import UserContext from '../util/User'
import PieColors from '../util/PieColors'

const PieChartStat = () => {
  const widthAndHeight = 250
  const { user } = useContext(UserContext)
  
  const [sliceColor, setSliceColor] = useState(['#D3D3D3'])
  const obj = new DateDisplay()
  
  const [frequency, setFrequency] = useState(obj.get_weeks_data())
  const [series, setSeries] = useState([100])
  const [pieChartData, setPieChartData] = useState([])
  const [startDate, setStartDate] = useState(getFormattedDate(frequency[0]?.startDate))
  const [endDate, setEndDate] = useState(getFormattedDate(frequency[0]?.endDate))
  const [data, setData] = useState([])
  const [period, setPeriod] = useState(0)

  // Fetch data based on start and end dates
  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) return
      try {
        const response = await getTransactionAmountByCategory(user, startDate, endDate)
        setPieChartData(response?.Items || [])
      } catch (err) {
        console.error('Error fetching data:', err)
        setPieChartData([])  // Ensure pieChartData is never null
      }
    }
    fetchData()
  }, [startDate, endDate, user])

  // Update the dates when period or frequency changes
  useEffect(() => {
    if (frequency && frequency[period]) {
      setStartDate(getFormattedDate(frequency[period]?.startDate))
      setEndDate(getFormattedDate(frequency[period]?.endDate))
    }
  }, [period, frequency])

  const PerformWeekly = () => {
    setPeriod(0)
    setFrequency(obj.get_weeks_data())
  }

  const PerformMonthly = () => {
    setPeriod(0)
    setFrequency(obj.get_months_data())
  }

  const PerformYearly = () => {
    setPeriod(0)
    setFrequency(obj.get_years_data())
  }

  const moveLeft = () => {
    setPeriod((prev) => (prev - 1 + frequency.length) % frequency.length)
  }

  const moveRight = () => {
    setPeriod((prev) => (prev + 1) % frequency.length)
  }

  useEffect(() => {
    if (pieChartData?.length > 0) {
      const categories = [...new Set(pieChartData.map(item => item.category))]
      const categoryMap = {}

      pieChartData.forEach(item => {
        const { category, location } = item
        if (!categoryMap[category]) {
          categoryMap[category] = {
            locations: new Set(),
            count: 0
          }
        }
        categoryMap[category].locations.add(location)
        categoryMap[category].count += 1
      })

      const series = []
      const sliceColor = []
      const formattedData = []

      const totalCount = pieChartData.length || 1  // Prevent division by zero

      categories.forEach((category, index) => {
        const locations = Array.from(categoryMap[category].locations).join(', ')
        const count = categoryMap[category].count

        const percentage = ((count / totalCount) * 100).toFixed(1)

        series.push(count)
        sliceColor.push(PieColors[category]?.color || '#D3D3D3')

        formattedData.push({
          category,
          location: locations,
          percentage: `${percentage}%`,
          color: sliceColor[index],
          id: index
        })
      })

      setSliceColor(sliceColor.length > 0 ? sliceColor : ['#D3D3D3'])
      setSeries(series.length > 0 ? series : [1])
      setData(formattedData)
    } else {
      // Handle empty data
      setSliceColor(['#D3D3D3'])
      setSeries([1])
      setData([])
    }
  }, [pieChartData])

  const renderItem = ({ item }) => (
    <PieList
      color={item.color}
      category={item.category}
      location={item.location}
      percentage={item.percentage}
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.optionButton} onPress={PerformWeekly}>
          <Text style={styles.optionButtonText}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={PerformMonthly}>
          <Text style={styles.optionButtonText}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={PerformYearly}>
          <Text style={styles.optionButtonText}>Yearly</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.horizontalSlider}>
        <View style={styles.contentItem}>
          <Text>{frequency[period]?.range || 'No data'}</Text>
        </View>
        <TouchableOpacity style={styles.arrowLeft} onPress={moveLeft}>
          <AntDesign name="leftcircleo" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrowRight} onPress={moveRight}>
          <AntDesign name="rightcircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Donation Chart</Text>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
      />
      <View style={styles.list}>
        {data.length === 0 ? (
          <Text style={{ fontSize: 30, color: 'darkred' }}>No donations</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 200 }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lavender',
  },
  title: {
    fontSize: 24,
    margin: 10
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lavender',
    padding: 10
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10
  },
  optionButton: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionButtonText: {
    color: '#333',
    fontWeight: 'bold'
  },
  horizontalSlider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  contentItem: {
    width: 400,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowLeft: {
    position: 'absolute',
    left: 0,
    padding: 10
  },
  arrowRight: {
    position: 'absolute',
    right: 0,
    padding: 10
  },
})

export default PieChartStat