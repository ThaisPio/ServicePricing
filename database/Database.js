import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para criar o registro do usuário
export const addUser = async (nome_usuario, email, senha, cpf, numero_cel) => {
  try {
    // Gerando uma chave única (pode ser um timestamp)
    const userKey = `user_${Date.now()}`;

    // Criando o objeto de usuário
    const userData = {
      nome_usuario,
      email,
      senha,
      cpf,
      numero_cel,
    };

    // Salvando o usuário no AsyncStorage
    await AsyncStorage.setItem(userKey, JSON.stringify(userData));
    console.log('Usuário salvo com sucesso no AsyncStorage.');
    return true;
  } catch (error) {
    console.log('Erro ao salvar o usuário no AsyncStorage:', error.message);
    throw error;
  }
};

// Função para buscar um usuário por CPF/Email e senha
export const findUser = async (cpfEmail, password) => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();  // Obter todas as chaves salvas
    const allUsers = await AsyncStorage.multiGet(allKeys);  // Obter todos os dados de usuários

    for (const [key, value] of allUsers) {
      const user = JSON.parse(value);
      // Verificar se o email/CPF e senha correspondem
      if ((user.email === cpfEmail || user.cpf === cpfEmail) && user.senha === password) {
        return user;  // Retorna o usuário se encontrado
      }
    }

    return null;  // Usuário não encontrado
  } catch (error) {
    console.log('Erro ao buscar o usuário no AsyncStorage:', error.message);
    throw error;
  }
};
