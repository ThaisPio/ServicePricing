import { db } from '../database/database'

//Essa função insere um novo usuário no banco de dados- Ela recebe as informações do usuário
//(nome, e-mail/CPF, telefone, senha, tipo de perfil) e uma função de callback
//(successCallback) para ser chamada quando a operação terminar.
export const insertUser = async (name, cpf_email, phone, password, profile_type, successCallback) => {
  try {
    db.transaction(tx => {
      console.log("Tentando inserir o usuário:", name, cpf_email, phone, password, profile_type); // Adicionar log antes da inserção
      tx.executeSql(
        'INSERT INTO users (name, cpf_email, phone, password, profile_type) VALUES (?, ?, ?, ?, ?)',
        [name, cpf_email, phone, password, profile_type],
        (_, result) => {
          console.log("Resultado da inserção:", result); // Log do resultado
          successCallback(result);
        },
        (_, error) => {
          console.log('Erro ao inserir usuário:', error); // Log do erro
          successCallback(null); // Retornar null em caso de erro
        }
      );
    });
  } catch (error) {
    console.log('Erro inesperado ao inserir usuário:', error); // Capturar erro inesperado
    successCallback(null);
  }
};
//Função valida o login de um usuário. Ela verifica se existe um usuário com o cpf_email e password fornecidos no banco de dados
export const validateUserLogin = async (cpf_email, password, successCallback, errorCallback) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE cpf_email = ? AND password = ?',
        [cpf_email, password], // Use "cpf_email" em vez de "cpfEmail"
        (_, { rows }) => {
          if (rows.length > 0) {
            successCallback(rows._array[0]); // Certifique-se de que o user está sendo retornado corretamente
          } else {
            errorCallback();
          }
        },
        (_, error) => {
          console.log('Erro ao buscar usuário:', error);
          errorCallback(error);
        }
      );
    });
  } catch (error) {
    console.log('Erro ao validar login:', error);
    errorCallback(error);
  }
};


// Buscar serviços por user_id
export const getServicesByUser = (user_id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM services WHERE user_id = ?',
      [user_id],
      (_, { rows: { _array } }) => {
        callback(_array);
      },
      (_, error) => {
        console.log("Erro ao buscar serviços por user_id:", error);
      }
    );
  });
};

// Buscar todos os serviços adicionados
export const getAllServices = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM services',
      [],
      (_, { rows: { _array } }) => {
        callback(_array);
      },
      (_, error) => {
        console.log("Erro ao buscar todos os serviços:", error);
      }
    );
  });
};
