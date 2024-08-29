import React, { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { Buffer } from 'buffer';
import User from '../components/User';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userIdFromToken, setUserIdFromToken] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const encodedPayload = token.split('.')[1];
        const decodedPayload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf-8'));
        const userIdFromToken = decodedPayload.userId;
        const response = await axios.get(`http://192.168.1.8:8000/users/${userIdFromToken}`);
        setUsers(response.data);
        setUserIdFromToken(userIdFromToken);
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setLoading(false);
        setDataLoaded(true); 
      }
    };
    fetchUser();
  }, []);

  // useEffect(() => {
  //   if (userIdFromToken !== null) {
  //     console.log('userIdFromToken:', userIdFromToken);
  //   }
  // }, [userIdFromToken]);

  useLayoutEffect(() => {
    if (dataLoaded) {
      navigation.setOptions({
        headerTitle: '',
        headerLeft: () => (
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Swift Chat</Text>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon onPress={() => navigation.navigate("Chat", { userIdFromToken })} name="chatbubble-ellipses-outline" size={30} color="#900" />
            <Icon
              onPress={() => navigation.navigate('FriendScreen', { userIdFromToken })}
              name="people"
              size={30}
              color="#900"
            />
          </View>
        ),
      });
    }
  }, [dataLoaded]);

  return (
    <View>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} userIdFromToken={userIdFromToken} />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;