import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, TextInput } from 'react-native';
import FAQService from '../services/FAQService';

export default function FAQScreen() {
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    const faqList = await FAQService.getFAQs();
    setFaqs(faqList);
  };

  const addFAQ = async () => {
    await FAQService.addFAQ(newQuestion);
    setNewQuestion('');
    loadFAQs(); // Recarregar FAQs
  };

  return (
    <View>
      <FlatList
        data={faqs}
        renderItem={({ item }) => <Text>{item.question}</Text>}
        keyExtractor={item => item.id.toString()}
      />
      <TextInput
        placeholder="Nova dúvida"
        value={newQuestion}
        onChangeText={setNewQuestion}
      />
      <Button title="Adicionar" onPress={addFAQ} />
    </View>
  );
}
