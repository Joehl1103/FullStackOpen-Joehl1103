import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const getNoteById = async (id) => {
  // TODO implement a get method that allows us to pass
  const response = await axios.get(`${baseUrl}/${id}`)
  console.log('response for getNoteById', response)
  return response.data

}

const saveNote = async (object) => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object)
  return response.data
  // TODO implement a put method that allows us to overwrite a note 
}

export default { getAll, createNew, getNoteById, saveNote }
