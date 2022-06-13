import React, { useState } from 'react'

import { useRouter } from 'next/router';
import {Grid, TextField, Typography, Box, Button } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';

import { useBookContext } from '../../context/libro/BookProvider'
import { width } from '@mui/system';

function Info({libro}) {

   console.log(libro)
    const [formData, setFormData] = useState(initialState(libro))
    const [onSaving, setOnSaving]=useState(false);

    const {prestarLibro, devolverLibro}=useBookContext();
    const router= useRouter()

    const handleSubmit = (e)=>{
        
        setOnSaving(true);
        e.preventDefault()
        try{
            prestarLibro(formData)
            toast('Los datos fueron guardados correctamente')
            setOnSaving(false)
            router.reload()
        }catch(error){
            setOnSaving(false);
            toast('Error al guardar los datos del prestamo')
        }
       
        
        
    }


    const devolverLibroHandle=async(id)=>{
        setOnSaving(true);
        console.log(id);
        try{
            await devolverLibro(id)
            toast('Libro devuelto')
            router.reload()
            setOnSaving(false)
        }catch(error){
            toast('Error al devolver el libro')
            setOnSaving(false)
        }
    }

    

  return (
   <>
    <ToastContainer theme='dark'/>

    
   <Grid container >
     <Grid item xs={14} sm={6} >
         <Box sx={{marginRight:'15px', marginLeft:'15px'}}>

            <Typography variant='h5' sx={{margin:'20px 0px ' , borderBottom:'2px solid #0070f3', textAlign:'center'}}>Informacion del libro</Typography>
            <Typography variant='h6'>Titulo: {libro.titulo}</Typography>
            <Typography variant='h6'>Autor: {libro.autor}</Typography>
            <Typography variant='h6'>Genero: {libro.genero}</Typography>
            <Typography variant='h6'>Estante: {libro.estante}</Typography>
            <Typography variant='h6'>Posicion: {libro.posicion}</Typography>

         </Box>


    </Grid>
    <Grid item xs={14} sm={6} >
        <Typography variant='h5' sx={{margin:'20px 0px 20px 20px' , borderBottom:'2px solid #0070f3', textAlign:'center'}}>Informacion del prestamo</Typography>


        {!libro.prestado
        ?(

        
                <form onSubmit={handleSubmit} noValidate>

                    <Box sx={{ marginRight:'15px', marginLeft:'15px' }}>
                       
                                <TextField 
                                    type='text'
                                    label="Nombre del quien retira el libro"
                                    variant="filled"
                                    name='nombre'
                                    onChange={(e)=>setFormData({...formData, nombre:e.target.value})}
                                    sx={{marginTop:'5px'}}
                                    fullWidth
                                />
                           
                                <TextField 
                                    label="Año que cursa"
                                    type='text'
                                    variant="filled"
                                    name='curso'
                                    onChange={(e)=>setFormData({...formData, curso:e.target.value})}
                                    sx={{marginTop:'15px'}}
                                    fullWidth 
                                    
                                />
                           
                                
                                <Button 
                                    color="corn" 
                                    className='circular-btn'
                                    size='large'
                                    fullWidth
                                    type='submit'
                                    variant='contained'
                                    disabled={onSaving}
                                    sx={{marginTop:'15px'}}
                                    
                                >
                                    Guardar datos del prestamo
                                </Button>
                            
                           
                        
                    </Box>
                </form>
            ):(
                <Box sx={{margin:'10px 15px'}}>
                    
                    

                    
                                <Typography variant='h6'>Nombre y Apellido: {libro.prestamo.nombre}</Typography>
                                <Typography variant='h6'>Curso: {libro.prestamo.curso}</Typography>
                                <Typography variant='h6'>Fecha del prestamo: {libro.prestamo.createdAt.slice(0,10)}</Typography>
                                <Button 
                                    color="corn" 
                                    className='circular-btn'
                                    size='large'
                                    fullWidth
                                    type='submit'
                                    variant='contained'
                                    disabled={onSaving}
                                    sx={{marginTop:'15px', marginBottom:'15px', width:'100%', borderRadius:0}}
                                    onClick={()=>devolverLibroHandle(libro._id)}
                                    
                                >
                                    Devolver libro
                                </Button>
                            
                            
                
                </Box>
            ) 
        }



    </Grid>

   </Grid>
   </>   
  )
}

export default Info


function initialState(libro){
    
    return {
        idLibro:libro._id,
        nombre:'',
        curso:''
    }
}