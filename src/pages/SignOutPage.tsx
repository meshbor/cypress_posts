import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { clearTokens } from 'app/store/slices/authSlice'
import { batch } from 'react-redux'
import { clearUser } from 'app/store/slices/userSlice'

export const SignOutPage: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    batch(() => {
      dispatch(clearTokens())
      dispatch(clearUser())
    })
    navigate('/')
  }, [dispatch, navigate])

  return null
}
