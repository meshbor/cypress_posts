import { Container, Typography } from '@mui/material'
import { withProtection } from 'HOCs/withProtection'
import { withQuery } from 'HOCs/withQuery'
import { useGetPostsQuery } from 'app/store/api/postsApi'
import { userSelector } from 'app/store/slices/userSlice'
import { PostList } from 'components/posts/PostList'
import { useAppSelector } from 'hooks/useAppSelector'
import { FC } from 'react'
import { getMessageFromError } from 'utils/errorUtils'

// Вот и наш защитник правопорядка - withProtection
export const PostsPage: FC = withProtection(() => {
  // Достаем текущего изера из redux'a, он нам нужен,
  // чтобы достать у него поле group, которое в свою очередь
  // нужно для формирования url запроса
  const user = useAppSelector(userSelector)

  // Инициализируем запрос на получения постов
  const {
    data: posts = [],
    isError,
    isLoading,
    error,
    refetch,
  } = useGetPostsQuery(
    // Первый аргумент — объект параметров для запроса
    { group: user.group },
    // Второй аргумент — настройки запроса
    {
      // ключ skip (как понятно из названия), пропускает запрос при условии
      // в нашем условии мы говорим, что запрос НЕ будет произведен,
      // если НЕТ группы пользователя
      // Группа пользователя нам нужна по документации нашей АПИшки
      skip: !user.group,
    },
  )

  return (
    <Container>
      <Typography component="h1" variant="h4" textAlign="center" sx={{ mb: 5 }}>
        Posts Page
      </Typography>
      {/* Используем HOC, который включает в себя дополнительную логику
        при взаимодействии с сетевыми запросами. В этом HOC'е мы отображаем ошибки и
        индикатор загрузки
      */}
      {withQuery(PostList)({
        isError, // этот prop нужен для HOC'a
        isLoading, // этот prop нужен для HOC'a
        error: getMessageFromError(error, 'Unknown error when trying to load list of posts'), // этот prop нужен для HOC'a
        refetch, // этот prop нужен для HOC'a
        posts: posts, // этот prop нужен для компонента PostList !!! <<<<<<<<<<<<<<<<<<
      })}
    </Container>
  )
})
