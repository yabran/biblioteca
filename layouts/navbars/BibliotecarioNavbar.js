
import NextLink from 'next/link';
import { AppBar, Box, Button, Link, Modal, Toolbar, Typography, Input, } from '@mui/material';
import { useEffect, useState } from 'react';


import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useAuthContext } from '../../context/auth/AuthenticationProvider';
import { useRouter } from 'next/router';
import AgregarLibroForm from '../../components/form/AgregarLibroForm';
import AgregarUsuarioForm from '../../components/form/AgregarUsuarioForm';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export const BibliotecarioNavbar = () => {

    const {logout, isLogged}=useAuthContext();
    const [openBookForm, setOpenBookForm] = useState(false);
    const [openUserForm, setOpenUserForm] = useState(false);    
    const [search, setSearch] = useState('');
    const router=useRouter();
    
 
    

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

    
    

    const handleSearch = (e) => {
        
        console.log('search', search);
        router.push('/admin/search/'+search);
    }

    const onLogout=()=>{
        logout();
        router.push('/');
    }

    

 
 
 return(
     <>
                    <AppBar>
                        <Toolbar id='toolbar'>
                            <NextLink href='/' passHref>
                                <Link display='flex' alignItems='center'>
                                    <Typography variant='h6'>Biblioteca |</Typography>
                                    <Typography sx={{ ml: 0.5 }}>Escuela Primaria N°56</Typography>
                                </Link>  
                            </NextLink>

                            <Box flex={1}></Box>
                            
                                <Input id='nav-search'  onChange={(e)=>setSearch(e.target.value)} value={search} onKeyUp={(e)=>e.code==='Enter'?handleSearch(e):undefined} placeholder="Buscar libro" /*inputProps={''}>*/ sx={{width:'40%'}}/>

                            
                            <Box flex={1}></Box>


                           <Box id='box-nav'>

                            <Button id='button-navbar' sx={{mr:3}} onClick={(e)=>{router.push('/admin/libros')}}>
                                    Libros
                            </Button>
                            <Button id='button-navbar' sx={{mr:3}} onClick={(e)=>{router.push('/admin/usuarios')}}>
                                Usuarios
                            </Button>
                            <Button  id='button-navbar' sx={{mr:3, borderRadius:'0px !important'}} onClick={onLogout}>
                                Cerrar Sesión
                            </Button>
                           </Box>
                                


                        </Toolbar>
                        
                    </AppBar>
        
                     <Modal
                        open={openBookForm||openUserForm}
                        onClose={handleClose}
                        aria-labelledby="Agregar Libro"
                        aria-describedby="modal-modal-description"
                        sx={{ height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}
                    >
                        <>
                         {openBookForm?(<AgregarLibroForm/>):(<AgregarUsuarioForm/>)}
                        </>
                       
                      
                    </Modal>
     </>
    )
}

