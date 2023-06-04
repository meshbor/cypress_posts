import { Post } from 'models/postModel'

export type PostFormValues = Pick<Post, 'title' | 'text' | 'image' | 'tags'>
