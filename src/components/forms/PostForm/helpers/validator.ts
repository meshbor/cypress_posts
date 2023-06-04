import * as yup from 'yup'

export const postFormSchema = yup.object({
  title: yup.string().min(3).required(),
  text: yup.string().min(20).required(),
  image: yup.string().url().required(),
  tags: yup.array().of(yup.string()).min(1).required(),
})
