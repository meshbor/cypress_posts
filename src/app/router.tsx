import { createBrowserRouter } from 'react-router-dom'
import { IndexPage } from '../pages/IndexPage'
import { SignUpPage } from '../pages/SignUpPage'
import { SignInPage } from 'pages/SignInPage'
import { SignOutPage } from 'pages/SignOutPage'
import { PostsPage } from 'pages/PostsPage'
import { MainPage } from 'pages/MainPage'
import { CreatePostPage } from 'pages/CreatePostPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'posts',
        element: <PostsPage />,
      },
      {
        path: 'posts/create',
        element: <CreatePostPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signout',
        element: <SignOutPage />,
      },
    ],
  },
])
