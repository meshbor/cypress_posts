import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material'
import { accessTokenSelector } from 'app/store/slices/authSlice'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC } from 'react'

// Интерфейс для объекта-ссылки
interface LinkObj {
  linkTitle: string
  linkHref: `/${string}`
}

// Набор ссылок, которые будут доступны АВТОРИЗИРОВАННЫМ пользователям
const linkListForAuthorized: LinkObj[] = [
  {
    linkHref: '/posts',
    linkTitle: 'Posts',
  },
  {
    linkHref: '/posts/create',
    linkTitle: 'Create',
  },
  {
    linkHref: '/signout',
    linkTitle: 'Sign Out',
  },
]

// Набор ссылок, которые будут доступны НЕ АВТОРИЗИРОВАННЫМ пользователям
const linkListForNotAuthorized: LinkObj[] = [
  {
    linkHref: '/signup',
    linkTitle: 'SignUp',
  },
  {
    linkHref: '/signin',
    linkTitle: 'SignIn',
  },
]

export const Header: FC = () => {
  const accessToken = useAppSelector(accessTokenSelector)

  // Если у нас есть accessToken, значит пользователь авторизован
  const linkList = accessToken ? linkListForAuthorized : linkListForNotAuthorized
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar>
        <Link underline="none" color="ButtonText" variant="button" href={'/'}>
          <Typography variant="h6" component="h6">
            Home
          </Typography>
        </Link>

        <Box component="nav" sx={{ ml: 'auto' }}>
          {/* просто отображаем массив ссылок */}
          {linkList.map((linkObj) => (
            <Link key={linkObj.linkHref} href={linkObj.linkHref} sx={{ mx: 1 }}>
              {linkObj.linkTitle}
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
