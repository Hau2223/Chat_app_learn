import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useNavigation, useRoute} from '@react-navigation/native';
import UserChat from '../components/UserChat';

const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const route = useRoute();
  const userIdFromToken = route.params.userIdFromToken;
  const navigation = useNavigation();
  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response =  await fetch(`http://192.168.1.8:8000/accepted-friends/${userIdFromToken}`);
        const data =  await response.json();
        if (response.ok){
          setAcceptedFriends(data);
        }
      }catch (err) {
        console.log("Err showing the accepted friends", err);
      } 
    }
    acceptedFriendsList();
  }, [])
  return (
  <ScrollView showsVerticalScrollIndicator={false}>
    <Pressable>
      { acceptedFriends.map((item, index) => (
        <UserChat key={index} item={item} userIdFromToken={userIdFromToken}/>
      ))}
    </Pressable>
  </ScrollView>
  )
}

export default ChatsScreen

const styles = StyleSheet.create({})