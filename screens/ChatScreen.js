import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import ChatService from '../services/ChatService';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    const chatMessages = await ChatService.getMessages();
    setMessages(chatMessages);
  };

  const sendMessage = async () => {
    await ChatService.sendMessage(message);
    setMessage('');
    loadMessages(); // Recarregar mensagens
  };

  return (
    <View>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
        keyExtractor={item => item.id.toString()}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Digite sua mensagem"
      />
      <Button title="Enviar" onPress={sendMessage} />
    </View>
  );
}
