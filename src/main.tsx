import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import router from './routes/index.tsx'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router'
import { store } from './redux/store.ts'

  
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
