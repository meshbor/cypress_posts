import { NavLink as NavRouterLink, NavLinkProps as NavRouterLinkProps } from 'react-router-dom'
import { LinkProps } from '@mui/material/Link'
import { forwardRef } from 'react'
import { createTheme, useTheme } from '@mui/material'

// Смотри доку https://mui.com/material-ui/guides/routing/
// eslint-disable-next-line react-refresh/only-export-components
const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<NavRouterLinkProps, 'to'> & { href: NavRouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  const theme = useTheme()

  return (
    <NavRouterLink
      style={({ isActive }) => {
        return {
          color: isActive ? theme.palette.warning.main : theme.palette.primary.main,
        }
      }}
      // Prop end нужен для более точного определения активной ссылки
      // Читай доку https://reactrouter.com/en/main/components/nav-link#end
      end
      ref={ref}
      to={href}
      {...other}
    />
  )
})

LinkBehavior.displayName = 'LinkBehavior'

export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
        underline: 'hover',
      } as Omit<LinkProps, 'className'>,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
})
