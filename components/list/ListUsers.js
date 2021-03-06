import React, { useEffect, useRef, useState } from 'react'

import { DataGrid, esES} from '@mui/x-data-grid';
import { Button, Grid, Alert, Modal } from '@mui/material';

import {useRouter} from 'next/router'
import { useAuthContext } from '../../context/auth/AuthenticationProvider';
import  AgregarUsuarioForm  from '../form/AgregarUsuarioForm';




const ListUsers=()=> {

    

    const alert = useRef(<div></div>);

    const [open, setOpen] = useState(false);
    const [editSelected, setEditSelected] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const router= useRouter();

    const {users, getUsers, deleteUser} =useAuthContext();

    useEffect(() => {
        async function fetchData() {
            await getUsers()

        }
        fetchData()
      }, [])

    const columns = [
        { field: 'indice', headerName: 'Indice', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 200 },
        { field: 'apellido', headerName: 'Apellido', width: 200 },
        { field: 'username', headerName: 'Nombre de usuario', width: 150 },
        { field: 'password', headerName: 'Contraseña', width: 150 },
        { field: 'rol', headerName: 'Rol', width: 200 },
        
        { field: 'acciones', headerName: 'Acciones', width: 300, 
            renderCell:(user)=>{
                
                return (
                    <>
                        <Button sx={{marginRight:'10px'}} variant="contained" color="primary" onClick={(e)=>onEdit(user.row.id, e)}>
                            Editar
                        </Button>
                        <Button variant="contained" color="primary" value={user.row}onClick={(e)=>onDelete(user.row.id ,e)}>
                            Eliminar
                        </Button>
                    
                    </>
                )
            }
        },
    
    
        
    ];

    const rows= users?.map((user, index)=>{
        return {
            id: user._id,
            indice:index+1,
            nombre:user.nombre,
            apellido:user.apellido,
            username:user.username,
            rol:user.rol,
            password:user.password,
            
        }
    })


   




    const onDelete=(id, e)=>{
        
        
    
       alert.current=(
        <Grid  sx={{height:'200px', width:'350px',}}>
            <Alert variant="filled" severity="warning" sx={{borderRadius:'0px'}}>
                ¿Esta seguro que desea eliminar el usuario?
            </Alert>
            <Alert
               severity='warning'
               icon={false}
               sx={{borderRadius:'0px'}}
               action={
                     <>
                        <Button color="inherit" size="small" sx={{marginRight:'20px'}} onClick={(e)=>onAcceptDelete(id, e)}>
                        Aceptar
                        </Button>
                        <Button color="inherit" size="small" onClick={onCancelDelete}>
                        Cancelar
                        </Button>
                        

                     
                     </>
                 }
            ></Alert>
           
            
        </Grid>
       )
       setOpen(true)
       

    }

    const onAcceptDelete=(id,e)=>{
        
        deleteUser(id)
        setOpen(false)
        router.reload()
        
    }

    const onCancelDelete=()=>{
        
        setOpen(false)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const onEdit=(id, e)=>{
        setSelectedUserId(id)
        setEditSelected(true)
        setOpen(true)
    }



  return (
      <>
      
      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="Agregar Usuario"
                        aria-describedby="modal-modal-description"
                        sx={{ height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}
                    >
          
            {!editSelected? alert.current: <AgregarUsuarioForm edit userId={selectedUserId} handleClose={handleClose} />}
          
      </Modal>
      
      <Grid item xs={14} sx={{ height:650, width: '90%', display:'flex', justifyContent:'center' }}>
          <DataGrid 
              rows={ rows }
              columns={ columns }
              pageSize={ 10 }
              rowsPerPageOptions={ [10] }
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
      
        </Grid>
      </>
    

   
    

  )
}

export default ListUsers