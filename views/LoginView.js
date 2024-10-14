import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUser } from '../controllers/UserController';

const LoginView = () => {
  const [cpfEmail, setCpfEmail] = useState(''); //Armazena o valor do campo de texto que o usuário insere (CPF ou e-mail).
  const [password, setPassword] = useState(''); //Armazena o valor da senha inserida pelo usuário.
  const navigation = useNavigation();

  const handleLogin = () => {
    //Chama a função getUser do controlador, que verifica se o CPF/E-mail e a senha fornecidos são válidos.
    getUser(cpfEmail, password, (user) => {
      if (user) {
        console.log('Profile Type:', user.profile_type); // Verifica o valor de profile_type
        Alert.alert('Login bem-sucedido');
    
        if (user.profile_type === 'administrador' || user.profile_type === 'empresa') {
          navigation.navigate('ServiceList', { user_id: user.id, profile_type: user.profile_type });
        } else if (user.profile_type === 'cliente') {
          navigation.navigate('ServiceList', { user_id: user.id, profile_type: user.profile_type });
        } else {
          Alert.alert('Tipo de perfil inválido.');
        }
      } else {
        Alert.alert('Credenciais inválidas', 'CPF/E-mail ou senha estão incorretos.');
      }
    }, (error) => {
      Alert.alert('Erro ao efetuar login', 'Ocorreu um erro ao tentar logar. Tente novamente.');
      console.log('Erro ao efetuar login:', error);
    });
    // Limpar os campos de entrada após o login
    setCpfEmail('');
    setPassword('');
  };
//Renderização da interface
  return (
    <View style={styles.container}>
      {/* Adiciona a logo aqui */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Service Pricing</Text>

      <TextInput
        style={styles.input}
        placeholder="name@example.com ou CPF"
        value={cpfEmail}
        onChangeText={setCpfEmail}
        keyboardType="default"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Esqueceu a senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: '#4B9CE2',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginView;
