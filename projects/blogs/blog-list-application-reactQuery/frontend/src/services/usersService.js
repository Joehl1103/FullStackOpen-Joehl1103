import axios from "axios";
const baseUrl = "/api/users";

const getUsers = async () => {
  const request = await axios.get(baseUrl);
  return request.data
};

const getUserById = async (id) => {
  console.log(`calling getUserbyId service with id: ${id}`)
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

export default { getUsers, getUserById };
