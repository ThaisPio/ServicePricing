import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ServiceListView from './views/ServiceListView';
import AddServiceView from './views/AddServiceView';
import EditServiceView from './views/EditServiceView'; // Importando a tela de edição
import LoginView from './views/LoginView';
import CadastroView from './views/CadastroView';
import { setupDatabase } from './database/database'; 

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    setupDatabase();
  }, []); 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginView} options={{ title: 'Login' }} />
        <Stack.Screen name="Cadastro" component={CadastroView} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="ServiceList" component={ServiceListView} options={{ title: 'Lista de Serviços' }} />
        <Stack.Screen name="AddService" component={AddServiceView} options={{ title: 'Adicionar Serviço' }} />
        <Stack.Screen name="EditService" component={EditServiceView} options={{ title: 'Editar Serviço' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
