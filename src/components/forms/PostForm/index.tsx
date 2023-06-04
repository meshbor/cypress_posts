import { ChangeEventHandler, FC } from 'react'
import { Avatar, Box, Container, TextField, Typography } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { postFormSchema } from './helpers/validator'
import LoadingButton from '@mui/lab/LoadingButton'
import { toast } from 'react-toastify'
import { getMessageFromError } from 'utils/errorUtils'
import { useNavigate } from 'react-router-dom'
import { PostFormValues } from './helpers/types'
import { useCreatePostMutation } from 'app/store/api/postsApi'
import { withProtection } from 'HOCs/withProtection'
import { useAppSelector } from 'hooks/useAppSelector'
import { userSelector } from 'app/store/slices/userSlice'
import { PostAdd } from '@mui/icons-material'

// Тут все аналогично предыдущим формам
export const PostForm: FC = withProtection(() => {
  const navigate = useNavigate()
  const [createPostRequest] = useCreatePostMutation()
  const user = useAppSelector(userSelector)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm<PostFormValues>({
    defaultValues: {
      text: '',
      title: '',
      image: '',
      tags: [],
    },
    resolver: yupResolver(postFormSchema),
  })

  const submitHandler: SubmitHandler<PostFormValues> = async (values) => {
    try {
      await createPostRequest({ ...values, group: user.group }).unwrap()
      toast.success('Вы успешно зарегистрировали новый пост')
      navigate('/posts')
    } catch (error) {
      toast.error(getMessageFromError(error, 'Не известная ошибка при регистрации поста'))
    }
  }

  // Бэкенд ожидает, что мы пришлем теги в виде массива строк
  // В нашей форме теги мы собираем в одном текстовом инпуте,
  // Ниже представлена логика, сохранения данных
  const tagsChangeHandler:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = (e) => {
    const newValue = e.target.value

    // Если у нас в инпуте нет ничего, то мы сохраняем в форму пустой массив, в качестве значения
    // Если в инпуте есть строка, то мы сплитим ее по запятой и вырезаем в каждому получившемся
    // элементе массива все начальные пробелы. Они там появляются из-за логики, представленной ниже в форме
    // Ищите комментарий ниже помеченный как <<<>>>
    return setValue('tags', newValue ? newValue.split(',').map((el) => el.trimStart()) : [], {
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PostAdd />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Post
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submitHandler)} noValidate sx={{ mt: 1 }}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                label="Title"
                fullWidth
                required
                error={!!errors.title?.message}
                helperText={errors.title?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                label="Text"
                fullWidth
                required
                error={!!errors.text?.message}
                helperText={errors.text?.message}
                rows={3}
                {...field}
              />
            )}
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                label="Image url"
                error={!!errors.image?.message}
                helperText={errors.image?.message}
                margin="normal"
                fullWidth
                required
                {...field}
              />
            )}
          />
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TextField
                label="Tags"
                error={!!errors.tags?.message}
                helperText={errors.tags?.message}
                margin="normal"
                fullWidth
                required
                {...field}
                // <<<>>>
                // Чтобы теги были читаемыми, мы после каждой запятой
                // автоматически добавляем пробел
                value={field.value.join(', ')}
                onChange={tagsChangeHandler}
                // Когда пропадает фокус, удаляем все пустые элементы
                // Это позволяет избавиться от последней запятой, после которой
                // нет ничего
                onBlur={() => {
                  setValue('tags', field.value.filter(Boolean), {
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }}
              />
            )}
          />
          <LoadingButton
            type="submit"
            disabled={isSubmitted && (!isValid || isSubmitting)}
            loading={isSubmitting}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Post
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  )
})
