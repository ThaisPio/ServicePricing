import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { handleAddService } from '../controllers/ServiceController';

const AddServiceView = ({ navigation, route }) => {
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [category, setCategory] = useState('Serviços de suporte ao usuário e monitoria');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Captura user_id e profile_type dos parâmetros de navegação
  const { user_id, profile_type } = route.params;

  if (!user_id) {
    Alert.alert("Erro", "Usuário não identificado. Tente novamente.");
    return;
  }

  const addService = () => {
    if (!companyName || !location || !serviceName || !category || !description || !price) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      Alert.alert('Erro', 'O preço deve ser um número válido.');
      return;
    }

    handleAddService(companyName, location, serviceName, category, description, numericPrice, user_id, (result) => {
      if (result) {
        console.log("Serviço cadastrado com sucesso no banco:", result);
        Alert.alert('Sucesso', 'Serviço cadastrado com sucesso!');

        // Verificando o tipo de perfil antes da navegação
        if (profile_type) {
          console.log("Redirecionando com profile_type:", profile_type);
          // Redireciona para ServiceListView passando user_id e profile_type
          navigation.navigate('ServiceList', { user_id, profile_type });
        } else {
          console.log("Tipo de perfil desconhecido!");
          Alert.alert('Erro', 'Tipo de perfil não identificado.');
        }
      } else {
        console.log("Erro ao cadastrar o serviço");
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o serviço.');
      }
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome da Empresa"
        value={companyName}
        onChangeText={setCompanyName}
        style={styles.input}
      />
      <TextInput
        placeholder="Localização"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Nome do Serviço"
        value={serviceName}
        onChangeText={setServiceName}
        style={styles.input}
      />
      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}
      >
        <Picker.Item label="Serviços de suporte ao usuário e monitoria" value="Serviços de suporte ao usuário e monitoria" />
        <Picker.Item label="Serviços de redes e infraestrutura" value="Serviços de redes e infraestrutura" />
        <Picker.Item label="Serviço de desenvolvimento e sistemas" value="Serviço de desenvolvimento e sistemas" />
        <Picker.Item label="Backup e restauração de dados" value="Backup e restauração de dados" />
      </Picker>
      <TextInput
        placeholder="Descrição do Serviço"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Cadastrar Serviço" onPress={addService} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
});

export default AddServiceView;
