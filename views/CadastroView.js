import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text} from 'react-native';
import { handleAddUser } from '../controllers/UserController';
import { Picker } from '@react-native-picker/picker';

//Esses estados armazenam os valores inseridos pelo usuário nos campos de texto e na seleção de perfil
const CadastroView = ({ navigation }) => {
  const [name, setName] = useState('');
  const [cpfEmail, setCpfEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profileType, setProfileType] = useState('cliente'); // Padrão para "cliente"
  
//Verifica se todos os campos obrigatórios foram preenchidos. Caso contrário, exibe uma mensagem de erro
  const handleRegister = () => {
    if (!name || !cpfEmail || !phone || !password || !profileType) {
      Alert.alert('Preencha todos os campos obrigatórios.');
      return;
    }
  //Se todos os campos forem preenchidos, chama a função handleAddUser, que adiciona o usuário ao banco de dados ou servidor
    handleAddUser(name, cpfEmail, phone, password, profileType, (result) => {
      if (result && result.insertId) {
        Alert.alert('Usuário cadastrado com sucesso!');
        navigation.navigate('Login'); // Redirecionar para a tela de login após o cadastro
      } else {
        Alert.alert('Erro ao cadastrar usuário.');
      }
    });
  };
  
  
//Renderização da interface
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="CPF ou E-mail"
        value={cpfEmail}
        onChangeText={setCpfEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Número de Celular"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Picker
        selectedValue={profileType}
        onValueChange={(itemValue) => setProfileType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Cliente" value="cliente" />
        <Picker.Item label="Empresa" value="empresa" />
        <Picker.Item label="Administrador" value="administrador" />
      </Picker>
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
};

// Definição dos estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
});

export default CadastroView;
