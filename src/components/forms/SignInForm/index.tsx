import { FC } from 'react'
import { Avatar, Box, Container, Link, TextField, Typography } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { SignInFormValues } from './helpers/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpFormSchema } from './helpers/validator'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSignInMutation } from 'app/store/api/authApi'
import { toast } from 'react-toastify'
import { getMessageFromError } from 'utils/errorUtils'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { batch } from 'react-redux'
import { setUser } from 'app/store/slices/userSlice'
import { setTokens } from 'app/store/slices/authSlice'
import { objectHasProperty } from 'utils/commonUtils'

export const SignInForm: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [signInRequestFn] = useSignInMutation()
  const { state } = useLocation()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signUpFormSchema),
  })

  const submitHandler: SubmitHandler<SignInFormValues> = async (values) => {
    try {
      const response = await signInRequestFn(values).unwrap()
      toast.success('Вы успешно вошли в систему')
      batch(() => {
        dispatch(setUser(response.data))
        dispatch(setTokens({ accessToken: response.token, refreshToken: '' }))
      })
      navigate(
        objectHasProperty(state, 'from') && typeof state.from === 'string' ? state.from : '/',
      )
    } catch (error) {
      toast.error(getMessageFromError(error, 'Не известная ошибка при авторизации пользователя'))
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
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
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
            disabled={isSubmitted && (!isValid || isSubmitting)}
            loading={isSubmitting}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
        </Box>
        <Link href="/signup">{"Don't have an account? Sign Up!"}</Link>
      </Box>
    </Container>
  )
}
