import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React, {useContext} from 'react';
import {UserType} from '../UserContext';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const FriendRequest = ({item, friendRequest, setFriendRequests}) => {
  const route = useRoute();
  const userIdFromToken = route.params.userIdFromToken;
  const navigation = useNavigation();
  const acceptRequest = async friendRequestId => {
    try {
      const response = await fetch(
        'http://192.168.1.8:8000/friend-request/accept',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: friendRequestId,
            recepientId: userIdFromToken,
          }),
        },
      );
      if (response.ok) {
        setFriendRequests(
          friendRequest.filter(request => request._id !== friendRequestId),
        );
        navigation.navigate('Chat');
      }
    } catch (err) {
      console.log('Err accepting the friend request', err);
    }
  };
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 2,
      }}>
      <Image
        style={{width: 80, height: 80, borderRadius: 25}}
        source={{uri: item.image}}
      />
      <Text style={{fontSize: 18, fontWeight: 'bold', marginLeft: 5, flex: 1}}>
        {item?.name} sent you a friend request
      </Text>
      <Pressable
        onPress={() => acceptRequest(item._id)}
        style={{
          backgroundColor: '#0066b2',
          width: 110,
          padding: 15,
          borderRadius: 6,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          Accept
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});
