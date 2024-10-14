import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { getServicesByUserId, getAllServices, handleDeleteService } from '../controllers/ServiceController';

const ServiceListView = ({ route, navigation }) => {
  const [services, setServices] = useState([]);

  // Captura user_id e profile_type dos parâmetros da navegação
  const { user_id, profile_type } = route.params;

  // Log de verificação para garantir que os parâmetros estão corretos
  console.log("user_id recebido:", user_id);
  console.log("profile_type recebido:", profile_type);

  useEffect(() => {
    if (profile_type === 'empresa') {
      console.log("Buscando serviços para empresa...");
      // Se for empresa, buscar apenas os serviços cadastrados por este user_id
      getServicesByUserId(user_id, (result) => {
        setServices(result);
      });
    } else if (profile_type === 'cliente' || profile_type === 'administrador') {
      console.log("Buscando todos os serviços...");
      // Se for cliente ou administrador, buscar todos os serviços
      getAllServices((result) => {
        setServices(result);
      });
    } else {
      console.error("Tipo de perfil desconhecido! Valor recebido:", profile_type);
    }
  }, [user_id, profile_type]);

  const deleteService = (id) => {
    handleDeleteService(id, () => {
      setServices(services.filter(service => service.id !== id));
    });
  };

  return (
    <View style={styles.container}>
      {/* Exibe o botão de adicionar serviço apenas para 'empresa' ou 'administrador' */}
      {(profile_type === 'empresa' || profile_type === 'administrador') && (
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddService', { user_id, profile_type })}
        >
          <Text style={styles.addButtonText}>Adicionar Serviço</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>{item.service_name}</Text>
            <Text style={styles.serviceInfo}>Empresa: {item.company_name}</Text>
            <Text style={styles.serviceInfo}>Descrição: {item.description}</Text>
            <Text style={styles.serviceInfo}>Preço: R${item.price}</Text>

            {/* Exibe os botões de edição e exclusão apenas para o administrador e o criador do serviço */}
            {(profile_type === 'administrador' || item.user_id === user_id) && (
              <View>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => {
                    // Navega para a tela de edição de serviço
                    navigation.navigate('EditService', { serviceId: item.id });
                  }}
                >
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => deleteService(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceInfo: {
    fontSize: 14,
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ServiceListView;
