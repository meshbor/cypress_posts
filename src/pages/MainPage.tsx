import { Container, Typography } from '@mui/material'
import { FC } from 'react'

export const MainPage: FC = () => {
  return (
    <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
      <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
        Posts portal
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" component="p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores esse debitis mollitia
        autem eos error quasi saepe fuga eum nam omnis quas iusto in voluptate deleniti magni
        doloremque, laborum quia?
      </Typography>
    </Container>
  )
}
