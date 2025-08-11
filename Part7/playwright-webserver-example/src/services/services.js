import axios from 'axios'

const getStuff = async () => {
    const response = await axios.get('http://localhost:3000/posts')
    console.log('response data',response.data)
    return response.data
}

export default { getStuff }
