import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from './config'
import { SignUpFormValues } from 'components/forms/SignUpForm/helpers/types'
import { User } from 'models/userModel'
import { Tokens } from 'models/tokensModel'
import { SignInFormValues } from 'components/forms/SignInForm/helpers/types'

// Из-за того что MongoDB называет id-шники
// через нижнее подчеркивание "_id", нам нужно слегка
// изменить модель пользователя
type BE_SingUpResponse = Omit<User, 'id'> & {
  _id: User['id']
}

// Типизация ответа бэка в raw-виде для формы авторизации
interface BE_SignInResponse {
  data: Omit<User, 'id'> & {
    _id: User['id']
  }
  token: Tokens['accessToken']
}

// Желаемая типизация ответа для формы авторизации
type SignInResponse = {
  data: User
  token: Tokens['accessToken']
}

// регистрируем новую АПИшку
export const authApi = createApi({
  // тут указываем уникальный путь для reducer'a
  reducerPath: 'authApi',
  // используем настроенную функции отправки запросов
  baseQuery: customBaseQuery,
  // заводим эндпоинты. прям как в ExpressJS
  endpoints: (builder) => ({
    // эндпоинт для регистрации. Обратите внимание на два generic'a
    // Первый — отвечает за типизацию ответа сервера
    // Второй — второй за типизацию передаваемых данных на сервер
    signUp: builder.mutation<BE_SingUpResponse, SignUpFormValues>({
      query: (data) => ({
        url: 'signup',
        method: 'POST',
        body: data,
      }),
    }),
    signIn: builder.mutation<SignInResponse, SignInFormValues>({
      query: (data) => ({
        url: 'signin',
        method: 'POST',
        body: data,
      }),
      // Т.к бэкэнд присылает id-шник не с тем неймингом,
      // нам нужно трансформировать ответ. Делается это в сециальном
      // методе, который называется  'transformResponse'
      transformResponse: (response: BE_SignInResponse) => {
        const {
          data: { _id, ...restData },
          ...restResponse
        } = response

        return {
          data: {
            id: _id,
            ...restData,
          },
          ...restResponse,
        }
      },
    }),
  }),
})

export const { useSignUpMutation, useSignInMutation } = authApi
