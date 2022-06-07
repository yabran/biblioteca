import {Grid, TextField, Typography, Box, Button } from '@mui/material'
import { borderBottom, margin } from '@mui/system'
import React, { useState } from 'react'
import { useBookContext } from '../../context/libro/BookProvider'

function Info({libro}) {

    
    const [formData, setFormData] = useState(initialState(libro))

    const {prestarLibro}=useBookContext();


    const handleSubmit = (e)=>{
        
        
        e.preventDefault()
        prestarLibro(formData)
    }

  return (
   <>
   
     <Grid item xs={6} sx={{ height:650, width: '30%', display:'flex', flexDirection:'column' ,  }}>
        <Typography variant='h5' sx={{margin:'20px 0px ' , borderBottom:'2px solid #0070f3', textAlign:'center'}}>Informacion del libro</Typography>
        <Typography variant='h6'>Titulo: {libro.titulo}</Typography>
        <Typography variant='h6'>Autor: {libro.autor}</Typography>
        <Typography variant='h6'>Genero: {libro.genero}</Typography>
        <Typography variant='h6'>Estante: {libro.estante}</Typography>
        <Typography variant='h6'>Posicion: {libro.posicion}</Typography>


    </Grid>
    <Grid item xs={6} sx={{ height:650, width: '40%', display:'flex', flexDirection:'column',  }}>
        <Typography variant='h5' sx={{margin:'20px 0px 20px 20px' , borderBottom:'2px solid #0070f3', textAlign:'center'}}>Informacion del prestamo</Typography>
        <form onSubmit={handleSubmit} noValidate>

            <Box sx={{ width:'100%',  padding:'10px 20px',alignItems:'center', justifyContent:'center', flexDirection:'column', display:'flex' }}>
                <Grid container spacing={2}>
                    

                    <Grid item xs={12}>
                        <TextField 
                            type='text'
                            label="Nombre del quien retira el libro"
                            variant="filled"
                            name='nombre'
                            onChange={(e)=>setFormData({...formData, nombre:e.target.value})}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Año que cursa"
                            type='text'
                            variant="filled"
                            name='curso'
                            onChange={(e)=>setFormData({...formData, curso:e.target.value})}
                            fullWidth 
                            
                        />
                    </Grid>
            
                
                   

                    <Grid item xs={12}>
                        
                        <Button 
                            color="corn" 
                            className='circular-btn'
                            size='large'
                            fullWidth
                            type='submit'
                            variant='contained'
                        >
                            Guardar datos del prestamo
                        </Button>
                    
                    </Grid>
                </Grid>
            </Box>
        </form>
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