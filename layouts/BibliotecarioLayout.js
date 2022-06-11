
import { BibliotecarioNavbar } from './bibliotecario';

import { useAuthContext } from '../context/auth/AuthenticationProvider';





export const BibliotecarioLayout = ({ children }) => {

    const {isLogged}=useAuthContext();
    

    


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
