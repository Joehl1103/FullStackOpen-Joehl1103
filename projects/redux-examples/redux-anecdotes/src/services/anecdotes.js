import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNote = async (note) => {
  const response = await axios.post(baseUrl, note)
  return response.data
}

export default { getAll, addNote }
