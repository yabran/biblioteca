import { AlumnoNavbar } from './navbars';

import { useAuthContext } from '../context/auth/AuthenticationProvider';
import { Grid } from '@mui/material';





export const AlumnoLayout = ({ children }) => {

    const {isLogged}=useAuthContext();
    

     


  return (
    
    <>
        
            <Grid columns={16}>
                <nav style={{display:'flex'}}>
                    <AlumnoNavbar />
                    
                    
                </nav>

            </Grid>
            <Grid columns={16} sx={{backgroundImage:'url("/assets/ui/fantasia2.jpg")', backgroundSize:'cover',backgroundPosition:'center', height:'300px', marginTop:'5px', borderTop:'5px solid black', }}>

            </Grid>

            
            <Grid columns={16} sx={{display:'flex', justifyContent:'center' ,alignItems:'center', width:'100%'}}>
                {children}

            </Grid>
       
    
    
    </>

        

        

       

    
  )
}
