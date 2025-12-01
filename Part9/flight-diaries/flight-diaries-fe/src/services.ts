import axios from 'axios';

export async function getDiaries() {
  const res = await axios.get('http://localhost:3000/api/diaries');
  return res.data;
};

