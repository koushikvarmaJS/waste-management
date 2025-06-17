import React, { useState, useContext, useEffect } from 'react'
import { TextInput, Button, Text, View, ActivityIndicator, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { GoogleGenerativeAI } from '@google/generative-ai'
import UserContext from '../util/User'
import { getAllDonations } from '../util/Api'

const API_KEY = 'AIzaSyDI58EAgh3uvnI6Iu5U9n_43MBK3jl3gac' // Store this securely using env variables

const gemini = new GoogleGenerativeAI(API_KEY)

const ChatBot = () => {
  const { user } = useContext(UserContext)
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ totalDonations: 0, totalCO2Reduced: 0 })

  const Carbon = {
    Food: 20,
    Clothes: 2,
    Accessories: 1,
    Place: 0,
    Medicine: 10,
    PetSupplies: 15,
    Stationary: 2,
    Others: 5
  }

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const data = await getAllDonations()
        const userDonations = data.filter(donation => donation.donarId === user.id)

        const totalDonations = userDonations.length
        const totalCO2Reduced = userDonations.reduce((acc, donation) => {
          const emission = Carbon[donation.category] || 0
          return acc + emission
        }, 0)

        setStats({ totalDonations, totalCO2Reduced })
      } catch (error) {
        console.error('Failed to fetch donations:', error)
      }
    }

    fetchDonations()
  }, [user])

  const handleQuestion = async () => {
    if (!input.trim()) {
      setResponse('Please enter a question.')
      return
    }

    setLoading(true)
    setResponse('')

    try {
      const prompt = `
        The user has donated a total of $${stats.totalDonations} and has reduced ${stats.totalCO2Reduced} kg of CO2.
        Respond to this question considering that context: ${input}
      `

      const model = gemini.getGenerativeModel({ model: 'gemini-2.0-flash' })
      const result = await model.generateContent(prompt)
      const text = result.response.text()

      setResponse(text)
    } catch (error) {
      console.error('Error:', error)
      setResponse('Sorry, there was an issue processing your request.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 16, flex: 1, justifyContent: 'center' }}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask me about your donations or CO2 reductions..."
            style={{
              borderWidth: 1,
              padding: 12,
              borderRadius: 8,
              marginBottom: 12,
              borderColor: '#ccc'
            }}
          />
          <Button title="Ask" onPress={handleQuestion} />
          {loading && <ActivityIndicator style={{ marginTop: 10 }} />}
          {response ? (
            <Text style={{ marginTop: 10, fontSize: 16, color: '#4CAF50' }}>
              {response}
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

export default ChatBot