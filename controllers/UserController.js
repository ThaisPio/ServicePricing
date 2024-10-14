import { insertUser, validateUserLogin } from "../models/User";

//função responsável por adicionar um novo usuário ao sistema
export const handleAddUser = (name, cpf_email, phone, password, profile_type, successCallback) => {
  insertUser(name, cpf_email, phone, password, profile_type, (result) => {
    successCallback(result); // Passar o resultado da inserção de volta
  });
};


//função lida com a validação do login de um usuário, garantindo que as credenciais fornecidas correspondam a um usuário existente no banco de dados
export const getUser = (cpf_email, password, successCallback) => {
    validateUserLogin(cpf_email, password, (user) => {
      successCallback(user); // Passa o objeto `user` completo com `id`
    });
  };
