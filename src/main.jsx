import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppStateProvider } from './context/AppStateContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppStateProvider>
    <ToastContainer theme="dark"/>
    <App/>
  </AppStateProvider>  
)
