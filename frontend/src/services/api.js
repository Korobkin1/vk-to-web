import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const getQuestions = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/questions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const answerQuestion = async (questionId, answer) => {
  const token = localStorage.getItem('token');
  await axios.put(`${API_URL}/questions/${questionId}`, { answer }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
