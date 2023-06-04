import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { customBaseQuery } from './config'
import { Post } from 'models/postModel'
import { User } from 'models/userModel'

// Интерфейс для типизации объекта поста, приходящего с сервера
type BE_GetPostResponse = Omit<Post, 'id' | 'author' | 'createdAt' | 'updatedAt'> & {
  _id: Post['id']
  created_at: Post['createdAt']
  updated_at: Post['updatedAt']
  author: Omit<User, 'id'> & {
    _id: User['id']
  }
}

// Вспомогательная утилита, которая преобразует объект поста
// приходящего с бэка, в объект поста, который нужен фронтУ
const mapBackendPostToFrontend = ({
  _id: postId,
  author: { _id: authorId, ...restAuthor },
  created_at,
  updated_at,
  ...restPost
}: BE_GetPostResponse): Post => {
  return {
    id: postId,
    author: {
      id: authorId,
      ...restAuthor,
    },
    createdAt: created_at,
    updatedAt: updated_at,
    ...restPost,
  }
}

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: customBaseQuery,
  // Теги нужны для корректной работы системы
  // инвалидации запросов (принудительная повторная отправка запроса)
  // Для этого на корневом уровне АПИ мы объявляем массив возможных тегов, с
  // которыми наша АПИшка будет иметь дело
  // Т.к. текущее АПИ атомарно (заточено только для работы с постами), то в нашем
  // массиве только один элемент
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    // Endpoint для получения списка постов
    getPosts: builder.query<Post[], Pick<User, 'group'>>({
      query: ({ group }) => ({
        url: `v2/${group}/posts`,
      }),
      // Здесь мы говорим, что запрос на получения постов должен быть
      // закэширован по тегу "Posts"
      providesTags: ['Posts'],
      transformResponse: (response: BE_GetPostResponse[]) => {
        return response.map(mapBackendPostToFrontend)
      },
    }),
    // Endpoint для получения конкретного поста
    getPost: builder.query<Post, Pick<User, 'group'> & { postId: string }>({
      query: ({ group, postId }) => ({
        url: `v2/${group}/posts/${postId}`,
      }),
      // Здесь мы кешируем конкретный пост, указывая ID-шник поста
      providesTags: (result) => [{ type: 'Posts', id: result?.id }],
      transformResponse: (response: BE_GetPostResponse) => {
        return mapBackendPostToFrontend(response)
      },
    }),
    // Endpoint для создания нового поста
    createPost: builder.mutation<
      Post,
      Pick<Post, 'title' | 'image' | 'tags' | 'text'> & Pick<User, 'group'>
    >({
      // Из параметров вытаскиваем группу пользователя, она
      // нужна для формирования url. Все остальные параметры, это
      // ключи объекта для будущего поста, т.е тело запроса
      query: ({ group, ...body }) => ({
        url: `v2/${group}/posts`,
        method: 'POST',
        body,
      }),
      // После успешного выполнения запроса мы инвалидируем
      // тег "Posts". Это заставит RTK Query заново отправить запрос
      // на получения постов, а там как раз будет свежеиспеченный пост,
      // который мы и увидим на странице постов
      invalidatesTags: ['Posts'],
    }),
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useCreatePostMutation } = postApi
