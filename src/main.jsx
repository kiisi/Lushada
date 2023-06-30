import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppStateProvider } from './context/AppStateContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Flip } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppStateProvider>
    <ToastContainer theme="dark" position="top-center" autoClose={2000} transition={Flip} />
    <App/>
  </AppStateProvider>  
)
