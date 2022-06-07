
import { BibliotecarioNavbar } from './bibliotecario';
import { Box, CircularProgress, Grid } from '@mui/material';
import { useAuthContext } from '../context/auth/AuthenticationProvider';





export const BibliotecarioLayout = ({ children }) => {

    const {isLogged}=useAuthContext();
    

    

    if(!isLogged) return (
        <Box sx={{ display: 'flex', alignItems:'center', flexDirection:'column', justifyContent:'center', width:'100vw', height:'100vh', color:'white'}}>
        <h4>Cargando...</h4>
        <CircularProgress sx={{color:'white'}}/>
      </Box>
    )

  return (
    
    <>
        
            <Grid columns={16}>
                <nav style={{display:'flex'}}>
                    <BibliotecarioNavbar />
                    
                    
                </nav>

            </Grid>
            <Grid columns={16} sx={{backgroundImage:'url("/assets/ui/fantasia.jpg")', backgroundSize:'cover',backgroundPosition:'center', height:'300px', marginTop:'5px', borderTop:'5px solid black', }}>

            </Grid>

            
            <Grid columns={16} sx={{display:'flex', justifyContent:'center' ,alignItems:'center', width:'100%'}}>
                {children}

            </Grid>
       
    
    
    </>

        

        

       

    
  )
}
