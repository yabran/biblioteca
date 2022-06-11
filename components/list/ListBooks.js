import React, { useEffect, useRef, useState } from 'react'
import {useRouter} from 'next/router'

import { DataGrid, esES} from '@mui/x-data-grid';
import { Button, Grid, Alert, Modal } from '@mui/material';
import { useBookContext } from '../../context/libro/BookProvider';
import  AgregarLibroForm  from '../form/AgregarLibroForm';




const ListBooks=({search=null})=> {
    

    const {books, getAllBooks}= useBookContext();

    const alert = useRef(<div></div>);

    const [open, setOpen] = useState(false);
    const [editSelected, setEditSelected] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState('');
    const router= useRouter();

    const {removeBook} =useBookContext()

    useEffect(() => {
        async function fetchData() {
            
            await getAllBooks()
        }
        fetchData()
    }, [])
    

    const columns = [
        { field: 'indice', headerName: 'Indice', width: 70 },
        { field: 'titulo', headerName: 'Titulo del libro', width: 300 },
        { field: 'autor', headerName: 'Autor', width: 300 },
        { field: 'editorial', headerName: 'Editorial', width: 150 },
        { field: 'genero', headerName: 'Genero', width: 150 },
        { field: 'estante', headerName: 'Estante', width: 100 },
        { field: 'posicion', headerName: 'Posicion', width: 100 },
        { field: 'acciones', headerName: 'Acciones', width: 500, 
            renderCell:(book)=>{
                
                return (
                    <>
                        {book.row.prestado
                            ?(
                                <Button sx={{marginRight:'10px'}} variant="contained" color="primary" value={book.row}onClick={()=>retirarLibro(book.row.id)}>
                                    Info del prestamo
                                </Button>

                            ):
                            (
                                <Button sx={{marginRight:'10px'}} variant="contained" color="primary" value={book.row}onClick={()=>retirarLibro(book.row.id)}>
                                    Prestar Libro
                                </Button>
                            
                            )
                        
                        
                        }
                        

                        <Button sx={{marginRight:'10px'}} variant="contained" color="primary" onClick={(e)=>onEdit(book.row.id, e)}>
                            Editar
                        </Button>
                        <Button  variant="contained" color="primary" value={book.row}onClick={(e)=>onDelete(book.row.id ,e)}>
                            Eliminar
                        </Button>
                        
                    
                    </>
                )
            }
        },
    
    
        
    ];

    const rows= (search||books).map((book, index)=>{
        return {
            id: book._id,
            indice:index+1,
            titulo:book.titulo,
            autor:book.autor,
            editorial:book.editorial,
            genero:book.genero,
            estante:book.estante,
            posicion:book.posicion,
            prestado:book.prestado,
            
        }
    })


    const retirarLibro=(id)=>{
        router.push('/admin/prestamoLibro/'+id)
    }

   




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
        setEditSelected(false)
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
      
      <Grid item xs={12} sx={{ height:650, width: '100%', display:'flex', justifyContent:'center' }}>
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

export default ListBooks