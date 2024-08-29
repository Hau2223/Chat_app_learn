import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  useEffect(() =>{
    const checkLoginStatus = async() => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token){
          // navigation.navigate("HomeScreen")
        } else{
          //token  not found
  
        }
      }catch (err){
        console.log("error", err);
      }
    }
    checkLoginStatus();
  }, [])

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    axios
      .post('http://192.168.1.8:8000/login', user)
      .then(response => {
        // console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem('authToken', token);
        navigation.navigate('HomeScreen');
      })
      .catch(err => {
        Alert.alert('Login Error', 'Invalid email or password');
        console.log('Login Error', err);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
      }}>
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#4A55A2', fontSize: 35, fontWeight: 'bold'}}>
            Sign In
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: '600',
              marginTop: 15,
            }}>
            Sign In to Your Account
          </Text>
        </View>

        <View style={{marginTop: 50}}>
          <View>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                width: 400,
              }}
              placeholderTextColor={'black'}
              placeholder="enter Your Email"
            />
          </View>

          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                width: 400,
              }}
              placeholderTextColor={'black'}
              placeholder="Password"
            />
          </View>

          <Pressable
            onPress={handleLogin}
            style={{
              width: 250,
              backgroundColor: '#4A55A2',
              padding: 15,
              marginTop: 50,
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Login
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('RegisterScreen')}
            style={{margin: 15}}>
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
