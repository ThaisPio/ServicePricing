import * as SQLite from 'expo-sqlite/legacy';

// Abre o banco de dados
export const db = SQLite.openDatabase('dbServicePricing.db');

// Função para configurar o banco de dados
export const setupDatabase = () => {
  db.transaction(tx => {
    // Criação de tabela de usuários
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        cpf_email TEXT UNIQUE,
        phone TEXT UNIQUE,
        password TEXT,
        profile_type TEXT
      )`,
      [],
      () => { console.log("Tabela users criada ou já Existente."); },
      (_, error) => { console.log("Erro ao criar tabela users:", error); }
    ); 

    // Criação de tabela de serviços
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name TEXT,
        location TEXT,
        service_name TEXT,
        category TEXT,
        description TEXT,
        price REAL,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`,
      [],
      () => { console.log("Tabela services criada ou já Existente."); },
      (_, error) => { console.log("Erro ao criar tabela services:", error); }
    ); 

  });
};
