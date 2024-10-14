import { insertUser, validateUserLogin } from "../models/User";


export const handleAddUser = (name, cpf_email, phone, password, profile_type, successCallback) => {
  insertUser(name, cpf_email, phone, password, profile_type, (result) => {
    successCallback(result); // Passar o resultado da inserção de volta
  });
};



export const getUser = (cpf_email, password, successCallback) => {
    validateUserLogin(cpf_email, password, (user) => {
      successCallback(user); // Passa o objeto `user` completo com `id`
    });
  };