import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation, useRoute} from '@react-navigation/native';
import IconFeather from 'react-native-vector-icons/Feather';
import EmojiSelector from 'react-native-emoji-selector';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker'
const path = require('path'); // Import module path

const ChatMesssageScreen = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [selectedImage, setSeletedImage] = useState('');
  const [message, setMessage] = useState('');
  const [messageSend, setMessageSend] = useState([]); //messages = messagesend
  const [recepientData, setRecepientData] = useState();
  const route = useRoute();
  const senderId = route.params.senderId;
  const recepientId = route.params.recepientId;
  const navigation = useNavigation();

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.8:8000/messages/${senderId}/${recepientId}`,
      );
      const data = await response.json();
      if (response.ok) {
        setMessageSend(data);
      } else {
        console.log('err showing message', response.status.message);
      }
    } catch (error) {
      console.log('err fetching messages', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchRecepientData = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.8:8000/user/messages/${recepientId}`,
        );
        const data = await response.json();
        setRecepientData(data);
      } catch (err) {
        console.log('err retrieving details', err);
      }
    };
    fetchRecepientData();
  }, []);

  const handleSend = async (messageType, imageUri) => {
    try {
      const formData = new FormData();
      formData.append('senderId', senderId);
      formData.append('recepientId', recepientId);
      if (messageType === 'image') {
        formData.append('messageType', 'image');
        formData.append('imageFile', {
          uri: imageUri,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
      } else {
        formData.append('messageType', 'text');
        formData.append('messageText', message);
      }
      const response = await fetch('http://192.168.1.8:8000/messages', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setMessage('');
        setSeletedImage('');
        fetchMessages();
      }
    } catch (error) {
      console.log('err in sending the message', error);
    }
  };

  useLayoutEffect(() => {
    if (recepientData) {
      navigation.setOptions({
        headerTitle: '',
        headerLeft: () => (
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <IconIonicons
              onPress={() => navigation.goBack()}
              name="chevron-back-outline"
              size={24}
              color={'black'}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  resizeMode: 'cover',
                }}
                source={{uri: recepientData?.image}}
              />
              <Text style={{marginLeft: 5, fontSize: 15, fontWeight: 'bold'}}>
                {recepientData?.name}
              </Text>
            </View>
          </View>
        ),
      });
    }
  }, [recepientData]);
  
  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(time).toLocaleString('en-US', options);
  }

  const handleCameraPress = async () => {
    let result = await ImagePicker.launchImageLibrary(
      {mediaType: 'photo', quality: 1},
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = response.assets[0].uri;
          setSeletedImage(source);
          handleSend('image', source);
        }
      }
    );
    if (!result.canceled) {
      handleSend("image", result.uri);
    }
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView>
        {messageSend.map((item, index) => {
          if (item.messageType === 'text') {
            return (
              <Pressable
              key={index}
                style={[
                  item?.senderId._id === senderId
                    ? {
                        alignSelf: 'flex-end',
                        backgroundColor: '#DCF8C6',
                        padding: 8,
                        maxWidth: '60%',
                        borderRadius: 15,
                        marginTop: 5,
                        marginRight: 5
                      }
                    : {
                        alignSelf: 'flex-start',
                        backgroundColor: '#57cdf5',
                        padding: 8,
                        marginTop: 5,
                        borderRadius: 15,
                        maxWidth: '60%',
                        marginLeft: 5
                      },
                ]}>
                <Text style={{color: "black", fontSize: 15, textAlign: "left"}}>{item.message}</Text>
                <Text style={{textAlign: 'right', fontSize: 9, color: "gray", marginTop: 5}}>{formatTime(item.timeStamp)}</Text>
              </Pressable>
            );
          }
          if (item.messageType === 'image'){
            // const baseUrl =  "D:/Learn Project/messengerProject/api/files/";
            // const imageUrl = item.imageUrl;
            // const filename = imageUrl.split("/").pop();
            // const source = { uri: baseUrl + filename };
            return (
              <Pressable
              key={index}
                style={[
                  item?.senderId._id === senderId
                    ? {
                        alignSelf: 'flex-end',
                        backgroundColor: '#DCF8C6',
                        padding: 8,
                        maxWidth: '60%',
                        borderRadius: 15,
                        marginTop: 5,
                        marginRight: 5
                      }
                    : {
                        alignSelf: 'flex-start',
                        backgroundColor: '#57cdf5',
                        padding: 8,
                        marginTop: 5,
                        borderRadius: 15,
                        maxWidth: '60%',
                        marginLeft: 5
                      },
                ]}>
                <View>
                <Image
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 25,
                    resizeMode: 'cover',
                  }}
                  source={require("../api/files/1716201796521-81244623-image.jpg")}
                />
                  <Text style={{textAlign: 'right', fontSize: 9, color: "gray", marginTop: 5}}>{formatTime(item.timeStamp)}</Text>
                  
                </View>
              </Pressable>
            );
          } 
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderTopWidth: 2,
          borderTopColor: '#dddddd',
          marginBottom: showEmojiSelector ? 0 : 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
            marginHorizontal: 8,
          }}>
          <Icon
            onPress={handleEmojiPress}
            style={{marginRight: 5}}
            name="emoji-happy"
            size={24}
            color="black"
          />
          <Icon onPress={handleCameraPress} style={{marginLeft: 5}} name="camera" size={24} color="black" />
          <IconFeather name="mic" size={24} color="black" />
        </View>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={{
            flex: 1,
            height: 50,
            borderWidth: 1.5,
            borderColor: '#dddddd',
            borderRadius: 25,
            paddingHorizontal: 15,
          }}
          placeholder="Type Your message..."
        />

        <Pressable style={{marginLeft: 5}} onPress={() => handleSend('text')}>
          <IconFeather name="send" size={35} color="blue" />
        </Pressable>
      </View>
      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={emoji => {
            setMessage(preMessage => preMessage + emoji);
          }}
          style={{height: 350}}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMesssageScreen;

const styles = StyleSheet.create({});
