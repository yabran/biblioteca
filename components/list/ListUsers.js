import React, { useRef, useState } from 'react'

import { DataGrid, esES} from '@mui/x-data-grid';
import { Button, Grid, Alert, Modal } from '@mui/material';
import { useBookContext } from '../../context/libro/BookProvider';
import { AgregarLibroForm } from '../form/AgregarLibroForm';




const ListUsers=()=> {

    const {books}= useBookContext();

    const alert = useRef(<></>);

    const [open, setOpen] = useState(false);
    const [editSelected, setEditSelected] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState('');

    const {removeBook} =useBookContext()

    const columns = [
        { field: 'indice', headerName: 'Indice', width: 70 },
        { field: 'nombre', headerName: 'Nombre', width: 300 },
        { field: 'apellido', headerName: 'Apellido', width: 300 },
        { field: 'username', headerName: 'Nombre de usuario', width: 150 },
        { field: 'password', headerName: 'Contraseña', width: 150 },
        { field: 'rol', headerName: 'Rol', width: 100 },
        
        { field: 'acciones', headerName: 'Acciones', width: 300, 
            renderCell:(book)=>{
                
                return (
                    <>
                        <Button sx={{marginRight:'10px'}} variant="contained" color="primary" onClick={(e)=>onEdit(book.row.id, e)}>
                            Editar
                        </Button>
                        <Button variant="contained" color="primary" value={book.row}onClick={(e)=>onDelete(book.row.id ,e)}>
                            Eliminar
                        </Button>
                    
                    </>
                )
            }
        },
    
    
        
    ];

    const rows= books.map((book, index)=>{
        return {
            id: book._id,
            indice:index+1,
            titulo:book.titulo,
            autor:book.autor,
            editorial:book.editorial,
            genero:book.genero,
            estante:book.estante,
            posicion:book.posicion,
            
        }
    })


   




    const onDelete=(id, e)=>{
        
        
    
       alert.current=(
        <Grid  sx={{height:'200px', width:'350px',}}>
            <Alert variant="filled" severity="warning" sx={{borderRadius:'0px'}}>
                ¿Esta seguro que desea eliminar el libro?
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
        
        removeBook(id)
        setOpen(false)
    }

    const onCancelDelete=()=>{
        
        setOpen(false)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const onEdit=(id, e)=>{
        setSelectedBookId(id)
        setEditSelected(true)
        setOpen(true)
    }



  return (
      <>
      
      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="Agregar Libro"
                        aria-describedby="modal-modal-description"
                        sx={{ height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}
                    >
          
            {!editSelected? alert.current: <AgregarLibroForm edit bookId={selectedBookId} />}
          
      </Modal>
      
      <Grid item xs={12} sx={{ height:650, width: '80%', display:'flex', justifyContent:'center' }}>
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