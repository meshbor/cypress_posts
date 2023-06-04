import { Post } from 'models/postModel'
import { FC } from 'react'
import { PostListItem } from './PostListItem'
import { Grid, Typography } from '@mui/material'

export const PostList: FC<{ posts: Post[] }> = ({ posts }) => {
  if (!posts.length) return <Typography>Post list is empty</Typography>

  return (
    <Grid id="post-list-id" container spacing={2} justifyContent="flex-start" alignItems="stretch">
      {posts.map((post) => (
        <PostListItem key={post.id} {...post} />
      ))}
    </Grid>
  )
}
