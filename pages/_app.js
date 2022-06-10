import '../styles/globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticationProvider } from '../context/auth/AuthenticationProvider';
import {CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { BookProvider } from '../context/libro/BookProvider';


function MyApp({ Component, pageProps }) {

  
  return(
    <AuthenticationProvider>
      <BookProvider>

          <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
          </ThemeProvider>
      </BookProvider>

    </AuthenticationProvider>


  ) 
  
}

export default MyApp
