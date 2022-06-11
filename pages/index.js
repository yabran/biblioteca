
import styles from '../styles/HomePage.module.css'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput,
} from "mdbreact";
import { useEffect, useState } from 'react';
import { useAuthContext } from '../context/auth/AuthenticationProvider';
import { useRouter } from 'next/router';





export const HomePage=()=> {

  const [formValues, setFormValues] = useState(initialData())
  const {login, user, checkToken} = useAuthContext()
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    
    checkToken();
      
  
    return () => {
      
    }
  }, [checkToken])

  
  

  const onSendSubmit=async(e)=>{
    e.preventDefault()
    const user=await login(formValues.username, formValues.password);
    setFormValues(initialData())
    
    if(user){
      
      if(user.rol==='Alumno'){
        
        router.replace('/alumnoPage')
      }else{
        router.replace('/bibliotecarioPage')
      }
      
    }else{
      setError('Usuario o contraseña incorrectos')
    }
    
  }

  

  

  return (
    <MDBContainer fluid className={styles['login-content']} >
      <MDBRow className={styles['form-container']}>
        <MDBCol md="9">
          <form onSubmit={onSendSubmit} >
            <p className="h5 text-center mb-4">Ingresar a la biblioteca</p>
            {error!=='' ? <h2 className={styles.feedback}>{error}</h2>:null}
            <div className="grey-text">

              <MDBInput
                label="Nombre de usuario"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                name='username'
                onChange={(e)=>{setFormValues({...formValues, [e.target.name]:e.target.value})}}
                
              />
              <MDBInput 
                label="Contraseña"
                icon="lock"
                group
                type="password"
                validate
                error="wrong"
                success="right"
                name="password"
                onChange={(e)=>{setFormValues({...formValues, [e.target.name]:e.target.value})}}
                
              />
            </div>
           
            <div className="text-center">
              <MDBBtn outline color="unique" type='submit' className={styles['button-large']} >
                Iniciar sesión
                <MDBIcon far icon="paper-plane" className="ml-1" />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
 

function initialData(){
  return {
    username: '',
    password: '',
  }
}

export default HomePage;
