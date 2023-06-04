import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store'
import { ThemeProvider } from '@mui/material'
import { theme } from './app/theme'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <ToastContainer position="top-right" autoClose={5000} pauseOnHover theme="colored" />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
