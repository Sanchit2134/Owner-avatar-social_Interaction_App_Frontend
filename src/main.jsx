import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from './components/ui/sonner.jsx'
import store from './redux/Store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'

let persistor = persistStore(store)
createRoot(document.getElementById('root')).render(

    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster/>
      </PersistGate>
    </Provider>

)