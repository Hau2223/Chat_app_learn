import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserType} from '../UserContext';
import {useRoute} from '@react-navigation/native';
import {UserContextId} from '../UserContextId';
import axios from 'axios';
import FriendRequest from '../components/FriendRequest';

const FriendScreen = () => {
  const route = useRoute();
  const userIdFromToken = route.params.userIdFromToken;
  const [friendRequest, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.2:8000/friend-request/${userIdFromToken}`,
      );
      if (response.status === 200) {
        const friendRequestsData = response.data.map(friendRequest => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image,
          
        }));
        setFriendRequests(friendRequestsData);
      }
    } catch (err) {
      console.log('error message', err);
    }
  };
  
  return (
    <View style={{padding: 10, marginHorizontal: 12}}>
      {friendRequest.length > 0 && <Text>Your Friend Request</Text>}
      {friendRequest.map((item, index) => (
        <FriendRequest
          userIdFromToken={userIdFromToken}
          key={index}
          item={item}
          friendRequest={friendRequest}
          setFriendRequests={setFriendRequests}
        />
      ))}
    </View>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({});
