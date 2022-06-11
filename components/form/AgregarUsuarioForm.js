import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Autocomplete, Box, Button, Divider, Grid, TextField, Typography } from '@mui/material'
import { useAuthContext } from '../../context/auth/AuthenticationProvider'





function AgregarUsuarioForm(props, ref) {
    const { edit=false, userId=null}=props;
    const [formData, setFormData] = useState(initialState())
    const {addUser, getUser, editUser} =useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (edit) {
            
            getUser(userId)
            .then(user=>{
                
                setFormData(user)
            })
        }
    
      
    }, [getUser, edit, userId])
    

    const onChangeData = (e)=>{
        
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }


    const handleSubmit = (e)=>{
        if(!edit){

            addUser(formData).then(user=>{
                router.replace('/admin/usuarios')
            })

        }else{
            editUser(formData, userId)
        }


    }

   

  
  
    return (
    <Box ref={ref} sx={{backgroundColor:'aliceblue', borderRadius:'9px', border:'2px solid cornflowerblue', color:'white', width:'40%', height:'580px',alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
    <Typography id="modal-modal-title" color='cornflowerblue' sx={{textAlign:'center', pt:3, }} variant="h6" component="h2">
        {edit?'Editar usuario':'Crear nuevo usuario'}
    </Typography>
    <hr/>
    <form onSubmit={handleSubmit} noValidate>

            <Box sx={{ width:'100%',  padding:'10px 20px',alignItems:'center', justifyContent:'center', flexDirection:'column', display:'flex' }}>
                <Grid container spacing={2}>
                    

                    <Grid item xs={12}>
                        <TextField 
                            type='text'
                            label="Nombre"
                            variant="filled"
                            name='nombre'
                            value={formData.nombre}
                            onChange={onChangeData}
                            fullWidth
                         />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Apellido"
                            type='text'
                            variant="filled"
                            name='apellido'
                            value={formData.apellido}
                            onChange={onChangeData}
                            fullWidth 
                            
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Password"
                            type='password'
                            variant="filled"
                            name='password'
                            value={formData.password}
                            onChange={onChangeData}
                            fullWidth 
                            
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Nombre de usuario"
                            type='text'
                            variant="filled"
                            name='username'
                            value={formData.username}
                            onChange={onChangeData}
                            fullWidth 
                            
                        />
                    </Grid>
                    <Grid item xs={12}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={['Alumno', 'Biblioteca']}
                                fullWidth
                                value={edit?formData.rol:'Alumno'}
                                onChange={(e,v)=>{setFormData({...formData, rol:v==='Biblioteca'?'Bibliotecario':'Alumno'})}}
                                name='rol'
                                renderInput={(params) => <TextField {...params} label="Rol" />}
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
                            Guardar usuario
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
                            Actualizar usuario 
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
        nombre:'',
        apellido:'',
        password:'',
        username:'',
        rol:'ALumno',
       
    })
}

export default React.forwardRef(AgregarUsuarioForm)