import { Box, Container, Typography } from '@mui/material'
import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1">This is footer</Typography>
        {new Date().getFullYear()}
      </Container>
    </Box>
  )
}
