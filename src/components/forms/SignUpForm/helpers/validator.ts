import * as yup from 'yup'

export const signUpFormSchema = yup.object({
  email: yup.string().email().required(),
  // метод .strict() в конце нужен для корректной валидации
  // нижнего регистра
  group: yup.string().lowercase().required().strict(),
  password: yup.string().min(6).max(24).required(),
})
