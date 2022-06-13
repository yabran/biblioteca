import NextLink from 'next/link';
import { AppBar, Box, Button, Link, Toolbar, Typography, Input, } from '@mui/material';
import { useEffect, useState } from 'react';


import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useAuthContext } from '../../context/auth/AuthenticationProvider';
import { useRouter } from 'next/router';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export const AlumnoNavbar = () => {

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
        router.push('/search/'+search);
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
                            
                                <Input  onChange={(e)=>setSearch(e.target.value)} value={search} onKeyUp={(e)=>e.code==='Enter'?handleSearch(e):undefined} placeholder="Buscar libro" /*inputProps={''}>*/ sx={{width:'40%'}}/>

                            
                            <Box flex={1}></Box>


                            
                            <Button sx={{mr:3}} onClick={onLogout}>
                                Cerrar Sesión
                            </Button>


                        </Toolbar>
                        
                    </AppBar>
        
     </>
    )
}

