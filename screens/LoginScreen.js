import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import UserService from '../services/UserService';

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const result = await UserService.login(login, password);
    if (result.success) {
      navigation.navigate('Chat');
    } else {
      alert(result.message);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
