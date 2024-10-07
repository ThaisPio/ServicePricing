import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { addUser } from '../database/Database';  // Importa as funções de AsyncStorage

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState(''); // Nome do usuário
  const [phone, setPhone] = useState(''); // Número de celular
  const [cpfEmail, setCpfEmail] = useState(''); // CPF ou Email
  const [password, setPassword] = useState(''); // Senha

  const handleRegister = async () => {
    // Validar se todos os campos estão preenchidos
    if (!name || !phone || !cpfEmail || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Validações de CPF ou Email e telefone
    if (!isValidEmail(cpfEmail) && !isValidCPF(cpfEmail)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail ou CPF válido');
      return;
    }

    if (!isValidPhone(phone)) {
      Alert.alert('Erro', 'Por favor, insira um número de celular válido');
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
      return;
    }

    // Tentar adicionar o usuário
    try {
      await addUser(
        name,
        isValidEmail(cpfEmail) ? cpfEmail : '', // Email, se válido
        password,
        isValidCPF(cpfEmail) ? cpfEmail : '', // CPF, se válido
        phone
      );
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('Login'); // Redireciona para a tela de login
    } catch (error) {
      console.error('Erro ao cadastrar o usuário:', error);
      Alert.alert('Erro', 'Erro ao cadastrar o usuário: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Criar Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de celular"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="CPF ou Email"
        value={cpfEmail}
        onChangeText={setCpfEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Funções de validação
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidCPF = (cpf) => /^\d{11}$/.test(cpf);
const isValidPhone = (phone) => /^\d{11}$/.test(phone);
const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
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
  registerButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
