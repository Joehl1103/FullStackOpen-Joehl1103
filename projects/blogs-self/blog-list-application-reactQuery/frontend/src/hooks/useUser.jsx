import { useQuery } from '@tanstack/react-query'
import userService from '../services/usersService'

export const useGetUsersQuery = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsers()
  })
}

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => {
      console.log(`calling getUserById in hook with id ${id}`)
      return userService.getUserById(id)
    }
  })
}

