
import { BibliotecarioNavbar } from './navbars';

import { useAuthContext } from '../context/auth/AuthenticationProvider';
import { Button, Grid, Modal } from '@mui/material';
import { useState } from 'react';
import AgregarLibroForm from '../components/form/AgregarLibroForm';
import AgregarUsuarioForm from '../components/form/AgregarUsuarioForm';





export const BibliotecarioLayout = ({ children, section }) => {

    const {isLogged}=useAuthContext();
    const [openBookForm, setOpenBookForm] = useState(false);
    const [openUserForm, setOpenUserForm] = useState(false);    
   

    
    const handleOpen = () => {
      setOpenBookForm(true);
  }

  const handleClose = () => {
      setOpenBookForm(false);
      setOpenUserForm(false);
      
  }

  const handleOpenUser = () => {
      setOpenBookForm(false);
      setOpenUserForm(true);
  }

    


  return (
    
    <>
        
            <Grid columns={16}>
                <nav style={{display:'flex'}}>
                    <BibliotecarioNavbar />
                    
                    
                </nav>

            </Grid>
            <Grid columns={16} sx={{backgroundImage:'url("/assets/ui/fantasia2.jpg")', backgroundSize:'cover',backgroundPosition:'center', height:'300px', marginTop:'5px', borderTop:'5px solid black', }}>

            </Grid>
            {section === 'libros' &&
            <Grid columns={16} sx={{display:'flex', justifyContent:'flex-end' ,alignItems:'center',width:'100%' }}>
              <Button onClick={handleOpen} sx={{width:'100%',marginTop:'20px', border:'2px solid cornflowerblue', borderRadius:0, color:'white', fontSize:'15px', backgroundColor:'cornflowerblue', padding:'5px 20px', ":hover":{color:'cornflowerblue', backgroundColor:'white'}}}>
                Agregar Libro
              </Button>
            </Grid>
            }

            {section === 'usuarios' &&
            <Grid columns={14} sx={{display:'flex', justifyContent:'end' ,alignItems:'center', width:'100%'}}>
              <Button onClick={handleOpenUser} sx={{width:'100%', marginTop:'20px', border:'2px solid cornflowerblue', borderRadius:0, color:'white', fontSize:'15px', backgroundColor:'cornflowerblue', padding:'5px 20px', ":hover":{color:'cornflowerblue', backgroundColor:'white'}}}>
                Agregar usuario
              </Button>
            </Grid>
            }
            
            <Grid columns={16} sx={{display:'flex', justifyContent:'center' ,alignItems:'center', width:'100%'}}>
                {children}

            </Grid>

            <Modal
                        open={openBookForm||openUserForm}
                        onClose={handleClose}
                        aria-labelledby="Agregar Libro"
                        aria-describedby="modal-modal-description"
                        sx={{ height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}
                    >
                        <>
                         {openBookForm?(<AgregarLibroForm handleClose={handleClose} />):(<AgregarUsuarioForm handleClose={handleClose}/>)}
                        </>
                       
                      
            </Modal>
            
       
    
    
    </>

        

        

       

    
  )
}
