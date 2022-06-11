import React, { useEffect, useState } from 'react'

import {  Box, Button, Grid, Typography, TextField, Autocomplete, Divider, Chip } from '@mui/material';
import { useBookContext } from '../../context/libro/BookProvider';



export const AgregarLibroForm=({ edit=false, bookId=null})=> {
  
    const [formData, setFormData] = useState(initialState())
    const {addBook, editBook, getBookById} =useBookContext()
    const [newTagValue, setNewTagValue] = useState('');
    

    useEffect(() => {
        if (edit) {
            
            getBookById(bookId)
            .then(book=>{
                
                setFormData(book)
            })
        }
    
      
    }, [getBookById, edit, bookId])
    


    const onChangeData = (e)=>{
        
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }


    const handleSubmit = (e)=>{
        if(!edit){

            addBook(formData)
        }else{
            editBook(formData, bookId)
        }


    }

    const addTag=(tag)=>{
        const newTag=tag.replaceAll(' ','').toLowerCase()
        if(newTag.trim()!=='' && !formData.tags.includes(newTag)){
            setFormData({...formData, tags:[...formData.tags,newTag]})
            setNewTagValue('')
        }
        setNewTagValue('')
    }

    const onDeleteTag = ( tag ) => {
        

        const newTags = formData.tags.filter(t => t !== tag)
        setFormData({...formData, tags: newTags})

    }

  
  
    return (
    <Box sx={{backgroundColor:'aliceblue', borderRadius:'9px', border:'2px solid cornflowerblue', color:'white', width:'40%', height:'700px',alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
    <Typography id="modal-modal-title" color='cornflowerblue' sx={{textAlign:'center', pt:3, }} variant="h6" component="h2">
        {edit?'Editar Libro':'Cargar libro'}
    </Typography>
    <hr/>
    <form onSubmit={handleSubmit} noValidate>

            <Box sx={{ width:'100%',  padding:'10px 20px',alignItems:'center', justifyContent:'center', flexDirection:'column', display:'flex' }}>
                <Grid container spacing={2}>
                    

                    <Grid item xs={12}>
                        <TextField 
                            type='text'
                            label="Titulo"
                            variant="filled"
                            name='titulo'
                            value={formData.titulo}
                            onChange={onChangeData}
                            fullWidth
                         />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Autor"
                            type='text'
                            variant="filled"
                            name='autor'
                            value={formData.autor}
                            onChange={onChangeData}
                            fullWidth 
                            
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Editorial"
                            type='text'
                            variant="filled"
                            name='editorial'
                            value={formData.editorial}
                            onChange={onChangeData}
                            fullWidth 
                            
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            label="Estante"
                            type='text'
                            variant="filled"
                            name='estante'
                            value={formData.estante}
                            onChange={onChangeData}
                            fullWidth 
                            
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            label="Posicion"
                            type='number'
                            variant="filled"
                            name='posicion'
                            value={formData.posicion}
                            onChange={onChangeData}
                            fullWidth 
                            
                        />
                    </Grid>
                    <Grid item xs={12}>
                      
                         <TextField
                            value={newTagValue}
                            onChange={({target})=>setNewTagValue(target.value)}
                            label="Etiquetas"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            onKeyUp={(e)=>e.code==='Space'?addTag(newTagValue):undefined}
                            helperText="Presiona barra espaciadora para agregar nueva etiqueta"
                        />
                        
                    </Grid>
                  
                    <Grid item xs={12}>
                    <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                               formData.tags.map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={['Novela','Cuentos', 'Fabulas','Poesia','Historia','Geografia', 'Cs Naturales', 'Cs Sociales', 'Psicologia','Biografía','Informatica', 'Matematica', 'Lengua', 'Historietas','Comunicacion', 'Educacion Civica','Otro'].sort()}
                                fullWidth
                                value={edit?formData.genero:'Novela'}
                                onChange={(e,v)=>{setFormData({...formData, genero:v})}}
                                name='genero'
                                renderInput={(params) => <TextField {...params} label="Genero" />}
                            />
                    </Grid>

                        <hr width={1}/>
                        <Divider light sx={{color:'cornflowerblue', height:'2px'}} />

                    <Grid item xs={12}>
                        {!edit?
                        <Button 
                            color="corn" 
                            className='circular-btn'
                            size='large'
                            fullWidth
                            type='submit'
                            variant='contained'
                        >
                            Guardar
                        </Button>
                        
                        :
                        <Button 
                        color="corn" 
                        className='circular-btn'
                        size='large'
                        fullWidth
                        type='submit'
                        variant='contained'
                         >
                            Actualizar libro 
                         </Button>

                        }
                    </Grid>
                </Grid>
            </Box>
    </form>
</Box>
  )
}


const initialState =()=> {
    return({
        titulo:'',
        autor:'',
        editorial:'',
        genero:'Novela',
        estante:'',
        posicion:0,
        tags:[],
    })
}
