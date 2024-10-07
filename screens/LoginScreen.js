import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { findUser, createTable } from '../database/Database';  // Importa as funções do banco de dados

export default function LoginScreen({ navigation }) {
  const [emailOrCpf, setEmailOrCpf] = useState(''); // Campo de email ou CPF
  const [password, setPassword] = useState(''); // Campo de senha

  // Cria a tabela de usuários na primeira vez que a tela é carregada
  useEffect(() => {
    createTable(); // Certifique-se de que a tabela de usuários foi criada
  }, []);

  // Função de validação de login consultando o banco de dados SQLite
  const handleLogin = async () => {
    // Verifica se os campos estão preenchidos
    if (!emailOrCpf || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      // Buscar o usuário no banco de dados
      const user = await findUser(emailOrCpf, password); // Usa a função de busca no banco de dados
      if (user) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        navigation.navigate('Home'); // Redireciona para a tela Home após o login
      } else {
        Alert.alert('Erro', 'Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao realizar o login: ' + error.message);
    }
  };

  // Função para recuperação de senha
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navega para a tela de recuperação de senha
  };

  return (
    <View style={styles.container}>
      {/* Adicionando a logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.label}>ServicePricing</Text>

      {/* Input para Email ou CPF */}
      <TextInput 
        style={styles.input}
        placeholder="Email ou CPF"
        value={emailOrCpf}
        onChangeText={setEmailOrCpf}
      />

      {/* Input para Senha */}
      <TextInput 
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      {/* Botão de Login */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        {/* Botão de Registro */}
        <TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>

        {/* Botão de Recuperação de Senha */}
        <TouchableOpacity style={[styles.smallButton, styles.forgotPasswordButton]} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Esqueceu senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Estilos do Componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallButton: {
    flex: 1,
    backgroundColor: '#109c1e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  forgotPasswordButton: {
    backgroundColor: '#109c1e',
    marginRight: 0,
  },
});
