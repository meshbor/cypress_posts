import { Alert, AlertTitle, Box, Button, CircularProgress, Container } from '@mui/material'
import { ComponentType, FC } from 'react'

// Эти props'ы нужны для нашей логики по отображению
// ошибок, лоудера, а также кнопки повторного запроса
interface WithQueryProps {
  isLoading: boolean
  isError: boolean
  refetch: () => void
  error?: string
}

export const withQuery = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ReturnedComponent: FC<WithQueryProps & P> = (props) => {
    const { isError, isLoading, refetch, error, ...rest } = props

    // Ошибки часто возникают при сетевых взаимодействия,
    // нужно быть к ним готовым
    if (isError) {
      return (
        <Container maxWidth="sm">
          <Alert
            action={
              // Эта кнопка нужна для повторного запроса
              <Button onClick={refetch} color="inherit" size="small">
                Refetch
              </Button>
            }
            severity="error"
          >
            <AlertTitle>Error</AlertTitle>
            {/* текст ошибки */}
            {error ?? 'Unknown error. Please resend request'}
          </Alert>
        </Container>
      )
    }

    // Если ошибки нет, но запрос еще не завершен, то мы показываем
    // индикатор загрузки. Чтобы конечный пользователь понимал, что
    // наше приложение не зависло и скоро покажет данные
    if (isLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )
    }

    // если ошибок нет и мы получили данные, то показываем обернутый компонент
    return <WrappedComponent {...(rest as P)} />
  }

  ReturnedComponent.displayName = `withQuery${WrappedComponent.displayName}`
  return ReturnedComponent
}
