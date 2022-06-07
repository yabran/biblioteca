
import NextLink from 'next/link';
import { AppBar, Box, Button, Link, Modal, Toolbar, Typography, Input, } from '@mui/material';
import { useEffect, useState } from 'react';


import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useAuthContext } from '../../context/auth/AuthenticationProvider';
import { useRouter } from 'next/router';
import {AgregarLibroForm} from '../../components/form/AgregarLibroForm';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export const BibliotecarioNavbar = () => {

    const {logout, isLogged}=useAuthContext();
    const [open, setOpen] = useState(false);
    const router=useRouter();
    
 
    

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
    }

    const onLogout=()=>{
        logout();
        router.push('/');
    }

    

 
 
 return(
     <>
                    <AppBar>
                        <Toolbar>
                            <NextLink href='/' passHref>
                                <Link display='flex' alignItems='center'>
                                    <Typography variant='h6'>Biblioteca |</Typography>
                                    <Typography sx={{ ml: 0.5 }}>Escuela</Typography>
                                </Link>  
                            </NextLink>

                            <Box flex={1}></Box>
                            <Input placeholder="Buscar libro" /*inputProps={''}>*/ sx={{width:'40%'}}/>
                            <Box flex={1}></Box>


                            <Button sx={{mr:3}} onClick={handleOpen} >
                                Agregar libro
                            </Button>
                            <Button sx={{mr:3}} onClick={(e)=>{router.push('/bibliotecarioPage')}}>
                                Libros
                            </Button>
                            <Button sx={{mr:3}} onClick={(e)=>{router.push('/admin/usuarios')}}>
                                Usuarios
                            </Button>
                            <Button sx={{mr:3}} onClick={onLogout}>
                                Cerrar Sesión
                            </Button>


                        </Toolbar>
                        
                    </AppBar>
        
                     <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="Agregar Libro"
                        aria-describedby="modal-modal-description"
                        sx={{ height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}
                    >
                       <AgregarLibroForm/>
                    </Modal>
     </>
    )
}

