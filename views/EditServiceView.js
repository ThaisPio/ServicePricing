import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native'; // Adiciona a importação do Text
import { getServiceById, handleUpdateService } from '../controllers/ServiceController';

const EditServiceView = ({ route, navigation }) => {
    const { serviceId } = route.params;
    const [service, setService] = useState(null);
    
//Quando o componente é montado ou o serviceId é alterado, a função
    useEffect(() => {
        getServiceById(serviceId, (result) => {
            setService(result);
        });
    }, [serviceId]);
    
//Verifica se todos os campos necessários (nome do serviço, nome da empresa, descrição) foram preenchidos.
const updateService = () => {
  // Certifique-se de que todos os valores estão definidos corretamente
  if (!service || !service.service_name || !service.company_name || !service.description) {
    Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
    return;
  }
  //O preço é convertido para número (numericPrice). Se o valor não for um número válido, exibe um alerta de erro.
  const numericPrice = parseFloat(service.numeric_price); // Converte para número
  
  if (isNaN(numericPrice)) {
    Alert.alert('Erro', 'O preço deve ser um número válido.');
    return;
  }

 //Chama handleUpdateService: Se todos os campos forem válidos, a função handleUpdateService é chamada para atualizar o serviço no banco de dados
  handleUpdateService(service.id, service.company_name, service.location, service.service_name, service.category, service.description, numericPrice, () => {
    Alert.alert('Sucesso', 'Serviço atualizado com sucesso!');
    navigation.goBack();
  });
};
//renderização da interface
    return service ? (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome do Serviço"
                value={service.service_name}
                onChangeText={(text) => setService({ ...service, service_name: text })}
                style={styles.input}
            />

            <TextInput
                placeholder="Empresa"
                value={service.company_name}
                onChangeText={(text) => setService({ ...service, company_name: text })}
                style={styles.input}
            />

            <TextInput
                placeholder="Descrição"
                value={service.description}
                onChangeText={(text) => setService({ ...service, description: text })}
                style={styles.input}
            />

            <TextInput
                placeholder="Preço"
                value={service.numeric_price}
                onChangeText={(text) => setService({ ...service, numeric_price: text })}
                style={styles.input}
                keyboardType="numeric" // Define o teclado numérico para facilitar a entrada de números
            />

            <Button title="Atualizar Serviço" onPress={updateService} />
        </View>
    ) : (
        <View><Text>Carregando serviço...</Text></View> // Adiciona o componente Text
    );
};
//Estilização
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
});

export default EditServiceView;
