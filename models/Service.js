import { db } from '../database/database';


// Função para inserir um novo serviço
export const insertService = (companyName, location, serviceName, category, description, price, user_id, successCallback, errorCallback = () => {}) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO services (company_name, location, service_name, category, description, price, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [companyName, location, serviceName, category, description, price, user_id],
      (_, result) => {
        console.log("Serviço inserido com sucesso no banco de dados:", result);
        successCallback(result); // Chama o callback de sucesso
      },
      (_, error) => {
        console.log("Erro ao inserir serviço no banco de dados:", error);
        errorCallback(error); // Chama o callback de erro
      }
    );
  }, (transactionError) => {
    console.log("Erro na transação:", transactionError);
    errorCallback(transactionError);
  });
}

// Função para buscar os serviços pelo user_id
export const getServicesByUser = (user_id, successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM services WHERE user_id = ?',
      [user_id],
      (_, { rows }) => { successCallback(rows._array); },
      (_, error) => { console.log('Erro ao buscar serviços:', error); }
    );
  });
};


// Função para excluir um serviço
export const deleteService = (id, successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM services WHERE id = ?',
      [id],
      (_, result) => { successCallback(result); },
      (_, error) => { console.log('Erro ao excluir serviço:', error); }
    );
  });
};

// Função para atualizar um serviço
export const updateService = (id, companyName, location, serviceName, category, description, price, successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE services SET company_name = ?, location = ?, service_name = ?, category = ?, description = ?, price = ? WHERE id = ?',
      [companyName, location, serviceName, category, description, price, id],
      (_, result) => { successCallback(result); },
      (_, error) => { console.log('Erro ao atualizar serviço:', error); }
    );
  });
};

export const getAllServices = (successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM services',
      [],
      (_, { rows: { _array } }) => {
        successCallback(_array);
      },
      (_, error) => {
        console.log("Erro ao buscar todos os serviços:", error);
      }
    );
  });
};

export const getServiceById = (serviceId, successCallback, errorCallback = () => {}) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM services WHERE id = ?',
      [serviceId],
      (_, { rows }) => {
        if (rows.length > 0) {
          successCallback(rows._array[0]); // Retorna o primeiro serviço encontrado
        } else {
          errorCallback("Serviço não encontrado");
        }
      },
      (_, error) => {
        console.log("Erro ao buscar serviço por ID:", error);
        errorCallback(error);
      }
    );
  });
};