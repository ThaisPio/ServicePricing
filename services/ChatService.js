import ChatRepository from '../repositories/ChatRepository';

const ChatService = {
  async getMessages() {
    return await ChatRepository.getAllMessages();
  },
  async sendMessage(message) {
    return await ChatRepository.sendMessage(message);
  },
};

export default ChatService;
