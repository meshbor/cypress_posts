import { User } from './userModel'

export interface Post {
  id: string
  title: string
  text: string
  image: string
  likes: string[]
  tags: string[]
  author: User
  createdAt: string
  updatedAt: string
}
