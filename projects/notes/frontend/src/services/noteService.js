/**This is a service module to allow reuse of the main HTTP methods for the notes api endpoint */

import axios from 'axios'
const baseUrl = '/api/notes'

// private variable
let token = null

const setToken = newToken =>{
    token = `Bearer ${newToken}`
}

const getAll = () => {
    // console.log('starting getAll')
    const request = axios.get(baseUrl)
    // console.log('called request')
    return request
            .then(response => {
                return response.data
            })
            .catch(error => {
               console.log('error',error) 
            })
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data

}

const update = (id,newObject) => {
    const request = axios.put(`${baseUrl}/${id}`,newObject)
    return request.then(response => response.data)
 }

const deleteNote = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {getAll,create,update,deleteNote,setToken}