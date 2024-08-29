import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
const UserChat = ({item}) => {
  const route = useRoute();
  const userIdFromToken = route.params.userIdFromToken;
  const navigation = useNavigation();
  return (
    <Pressable
        onPress={()=> navigation.navigate("Message", {
            recepientId: item._id,
            senderId: userIdFromToken
        })}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: .7,
        borderColor: 'black',
        borderTopWidth: .5,
        borderBottomWidth: .5, 
        padding: 10
      }}>
      <Image
        style={{width: 80, height: 80, borderRadius: 40, resizeMode: 'cover'}}
        source={{uri: item?.image}}
      />
      <View style={{flex: 1}}>
        <Text style={{fontSize: 20, fontWeight: "bold", color: "black"}}>{item?.name}</Text>
        <Text style={{marginTop: 5, color:"gray", fontWeight: 500}}>last massage comes here</Text>
      </View>
      <View>
        <Text style={{fontSize: 15, fontWeight: "400", color: "#585858"}} >3:00 PM</Text>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
