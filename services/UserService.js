export const loginUser = async (email, password) => {
  
  try {
    
    const response = await fetch('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
      return data.user;
    } else {
      throw new Error('Credenciais inválidas');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
