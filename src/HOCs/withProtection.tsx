import { accessTokenSelector } from 'app/store/slices/authSlice'
import { useAppSelector } from 'hooks/useAppSelector'
import { ComponentType, FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

// HOC (компонент высшего порядка) — это функция, которая в качестве
// параметра принимает один или несколько компонентов. В теле HOC'a мы можем
// делать какие-то манипуляции (расширять поведение и т.д.). При этом
// передаваемый компонент мы никак не затрагиваем
export const withProtection = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ReturnedComponent: FC<P> = (props) => {
    // Достаем accessToken из redux'a
    const accessToken = useAppSelector(accessTokenSelector)
    // Объект location на понадобиться для задания состояния при redirect'e
    const location = useLocation()

    // Если токен пустой, то нужно отправить пользователя на странице входа в систему
    if (!accessToken) {
      return (
        <Navigate
          to="/signin"
          // при этом мы передаем состояние, в котором указываем, какую
          // страницу хотел посетить пользователь. И если он в дальнейшем
          // войдет в систему, то мы его автоматически перебросим на желаемую страницу
          state={{
            from: location.pathname,
          }}
        />
      )
    }

    // Если мы дошли до этой строчки, это значит что токен у пользователя есть
    // И он может посмотреть содержимое защищенного компонента
    return <WrappedComponent {...props} />
  }

  // У каждого компонента должно быть имя. Это поможет нам, когда будем использовать
  // dev tools'ы реакта
  ReturnedComponent.displayName = `withProtection${WrappedComponent.displayName}`
  return ReturnedComponent
}
