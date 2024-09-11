import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('myDatabase.db');  // Abre ou cria o banco de dados

const ChatRepository = {
  getAllMessages() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM messages',  // Query para pegar todas as mensagens
          [],
          (tx, results) => {
            let messages = [];
            for (let i = 0; i < results.rows.length; i++) {
              messages.push(results.rows.item(i));
            }
            resolve(messages);
          },
          error => reject(error)
        );
      });
    });
  },

  sendMessage(message) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO messages (text) VALUES (?)',  // Query para inserir mensagem
          [message],
          (tx, results) => resolve(results),
          error => reject(error)
        );
      });
    });
  }
};

export default ChatRepository;
