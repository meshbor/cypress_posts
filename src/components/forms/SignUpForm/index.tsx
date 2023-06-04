import { FC } from 'react'
import { Avatar, Box, Container, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { SignUpFormValues } from './helpers/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpFormSchema } from './helpers/validator'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSignUpMutation } from 'app/store/api/authApi'
import { toast } from 'react-toastify'
import { getMessageFromError } from 'utils/errorUtils'
import { useNavigate } from 'react-router-dom'

export const SignUpForm: FC = () => {
  // navigate поможет сделать редирект в нужный момент
  const navigate = useNavigate()
  // Из хука useSignUpMutation (был получен путем автогенерации)
  // достаем функцию, которая будет (регистрировать пользователя) делать POST-запрос к нашем серверу)
  const [signUpRequestFn] = useSignUpMutation()

  // инициализируем react-hook-form
  const {
    // control понадобиться, чтобы подружить react-hook-form и компоненты из MUI
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
    // с помощью generic подсказываем react-hook-form, какие поля содержит наша форма
  } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      group: '',
      password: '',
    },
    // react-hook-form умеет работать со многими библиотеками
    // валидации, мы используем yup
    resolver: yupResolver(signUpFormSchema),
  })

  const submitHandler: SubmitHandler<SignUpFormValues> = async (values) => {
    try {
      // метод "unwrap" помогает убрать вспомогательные обертки
      // RTK, которые обрабатывают ошибки. Теперь ошибки обрабатываем мы
      // с помощью конструкции try...catch. В этом случае нам так удобней
      await signUpRequestFn(values).unwrap()
      // Выводим уведомление, что пользователь успешно зарегался
      // Есть куча библиотек для отображения "Тостеров". Мы используем
      // react-toastify — https://github.com/fkhadra/react-toastify#readme
      toast.success('Вы успешно зарегистрированы! Войдите в систему')
      navigate('/signin')
    } catch (error) {
      // Если произошла ошибка, то выводим уведомление
      toast.error(getMessageFromError(error, 'Не известная ошибка при регистрации пользователя'))
    }
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submitHandler)} noValidate sx={{ mt: 1 }}>
          {/* Чтобы подружить react-hook-form с MUI используем компонент Controller
              смотри доку https://react-hook-form.com/get-started#IntegratingwithUIlibraries
           */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                margin="normal"
                label="Email Address"
                type="email"
                fullWidth
                required
                autoComplete="email"
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="group"
            control={control}
            render={({ field }) => (
              <TextField
                label="Group Id"
                type="text"
                margin="normal"
                error={!!errors.group?.message}
                helperText={errors.group?.message}
                fullWidth
                required
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                label="Password"
                type="password"
                error={!!errors.password?.message}
                helperText={errors.password?.message}
                margin="normal"
                fullWidth
                required
                {...field}
              />
            )}
          />

          <LoadingButton
            type="submit"
            // кнопка становится недоступной после первой валидации (если есть ошибки)
            // или когда выполняется отправка (чтобы не дать пользователю отправить форму несколько раз)
            disabled={isSubmitted && (!isValid || isSubmitting)}
            loading={isSubmitting}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  )
}
