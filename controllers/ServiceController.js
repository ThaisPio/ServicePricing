import { insertService, getServicesByUser, getAllServices as getAllServicesFromModel, getServiceById as getServiceByIdFromModel, deleteService, updateService } from '../models/Service';

// Função para adicionar serviço
export const handleAddService = (companyName, location, serviceName, category, description, price, user_id, successCallback) => {
  console.log("Chamando insertService com os seguintes dados:", { companyName, location, serviceName, category, description, price, user_id });
  
  insertService(companyName, location, serviceName, category, description, price, user_id, (result) => {
    console.log("Serviço cadastrado no banco com sucesso:", result);
    successCallback(result); // Chama o callback de sucesso
  }, (error) => {
    console.log("Erro ao cadastrar o serviço no banco:", error);
    successCallback(null); // Retorna null para indicar erro
  });
};

// Função para buscar serviços por user_id (usada por empresas)
export const getServicesByUserId = (user_id, successCallback) => {
  getServicesByUser(user_id, (result) => {
    successCallback(result);
  });
};

// Função para buscar todos os serviços (usada por clientes e administradores)
export const getAllServices = (successCallback) => {
  getAllServicesFromModel((result) => {
    successCallback(result);
  });
};

// Função para buscar um serviço pelo ID (usada na edição de serviço)
export const getServiceById = (serviceId, successCallback, errorCallback) => {
  getServiceByIdFromModel(serviceId, (result) => {
    successCallback(result);
  }, (error) => {
    errorCallback(error);
  });
};

// Função para deletar serviço
export const handleDeleteService = (id, successCallback) => {
  deleteService(id, (result) => {
    successCallback(result);
  });
};

// Função para atualizar serviço
export const handleUpdateService = (id, companyName, location, serviceName, category, description, price, successCallback) => {
  updateService(id, companyName, location, serviceName, category, description, price, (result) => {
    successCallback(result);
  });
};
