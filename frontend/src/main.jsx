import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persister = persistStore(store)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
    <App />

    </PersistGate>
  </Provider>
    <Toaster />
  </BrowserRouter>
  ,
)
