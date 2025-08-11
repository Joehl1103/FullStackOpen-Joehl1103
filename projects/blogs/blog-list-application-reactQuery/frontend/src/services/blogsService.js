import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  // console.log('setting token')
  token = `Bearer ${newToken}`;
  // console.log(`token set to ${token}`)
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.clear();
      // window.location.reload()
    }
    return Promise.reject(error);
  },
);

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data
};

const getById = async (id) => {
  // console.log('entering getById')
  const response = await axios.get(`${baseUrl}/${id}`)
  // console.log('response.data',response.data)
  return response.data
}

const createBlog = async (blogInfo) => {
  console.log('blogInfo in create blog', blogInfo)
  const config = {
    headers: { Authorization: token },
  };
  try {
    const request = await axios.post(baseUrl, blogInfo, config);
    const response = request.data;
    return response;
  } catch (e) {
    console.log(`Error ${e.message}`);
  }
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const request = await axios.delete(`${baseUrl}/${id}`, config);
    const response = request.data;
    return response;
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

const updateBlog = async (body, id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    console.log('body in updateBlog', body)
    const response = await axios.put(`${baseUrl}/${id}`, body, config);
    // todo i need to ensure that the retunrn value includes the id
    console.log('response in updateBlog', response.data)
    return response.data;
  } catch (e) {
    console.log(`Error in updateBlog: ${e.message}`);
    console.log(`error cause`, e.cause)
    throw e
  }
};


export default { getAll, getById, createBlog, setToken, deleteBlog, updateBlog };
