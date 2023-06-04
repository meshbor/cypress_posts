import { FC } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Post } from 'models/postModel'
import { Button, Grid } from '@mui/material'
import { dateFormatter } from 'utils/time'

export const PostListItem: FC<Post> = ({ title, text, author, image, createdAt }) => {
  return (
    <Grid item>
      <Card
        elevation={3}
        sx={{
          maxWidth: 345,
          minWidth: 345,
          display: 'flex',
          flexFlow: 'column',
          height: '100%',
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {author.name[0]}
            </Avatar>
          }
          title={title}
          subheader={dateFormatter.format(new Date(createdAt))}
        />
        <CardMedia component="img" height="194" image={image} alt={title} />
        <CardContent>
          <Typography noWrap={true} variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}
          disableSpacing
        >
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <Button variant="outlined">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
