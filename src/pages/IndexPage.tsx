import { Box, Container, CssBaseline } from '@mui/material'
import { FC } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Outlet } from 'react-router-dom'

export const IndexPage: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Header />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  )
}
