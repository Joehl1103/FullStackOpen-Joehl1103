import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  // console.log('setting token')
  token = `Bearer ${newToken}`
  // console.log(`token set to ${token}`)
}

axios.interceptors.response.use(
  response => response,
    error => {
      if(error.response && (error.response.status === 401 || error.response.status === 403)){
        localStorage.clear()
        // window.location.reload()
      }
      return Promise.reject(error)
    }
)

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (blogInfo) =>{
  // console.log('blogInfo',blogInfo)
  const config = {
    headers: { Authorization: token},
  }
  // console.log('token',token)
  try{
    const request = await axios.post(baseUrl,blogInfo,config)
    const response = request.data
    // console.log('request.data',request.data)
    return response
  } catch (e){
    console.log(`Error ${e.message}`)
  }
  

}

const deleteBlog = async (id) => {
  console.log(`deleteBlog id ${id}`)
  const config = {
    headers: { Authorization: token},
  }
  console.log(`config = ${config.headers.Authorization}`)
  try {
    const request = axios.delete(`${baseUrl}/${id}`,config)
    console.log('request successful')
    const response = request.data
    return response
  } catch (e){
    console.log(`Error: ${e.message}`)
  }
 
}

export default { getAll,createBlog,setToken, deleteBlog }