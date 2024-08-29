import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };
    axios
      .post('http://192.168.1.8:8000/register', user)
      .then(response => {
        console.log(response);
        Alert.alert(
          'Registration successful',
          'You have been registered Successfully!',
        );
        setName('');
        setEmail('');
        setPassword('');
        setImage('');
      })
      .catch(error => {
        Alert.alert(
          'Registration Error',
          'An error occurred while registering',
        );
        console.log('Registration failed', error);
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#4A55A2', fontSize: 35, fontWeight: 'bold'}}>
            Register
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: '600',
              marginTop: 15,
            }}>
            Register To Your Account
          </Text>
        </View>

        <View style={{marginTop: 50}}>
          <View>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
              Name
            </Text>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                width: 400,
              }}
              placeholderTextColor={'black'}
              placeholder="Enter your name"
            />
          </View>
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
              placeholder="Enter your email"
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

          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
              Image
            </Text>
            <TextInput
              value={image}
              onChangeText={text => setImage(text)}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                width: 400,
              }}
              placeholderTextColor={'black'}
              placeholder="Image"
            />
          </View>

          <Pressable
            onPress={handleRegister}
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
              Register
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()} style={{margin: 15}}>
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;
