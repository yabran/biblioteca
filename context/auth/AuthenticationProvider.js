
import React, {useReducer, useContext} from 'react';
import { useRouter } from 'next/router';
import bibliotecaApi from '../../api/bibliotecaApi';
import Cookies from 'js-cookie'


const AuthContext = React.createContext();

const initialState={
    isLogged:false,
    user:{
        username:'',
        password:'',
        rol:'',
        nombre:'',
        apellido:'',
    }
}


const useAuthContext = () => {
    return useContext(AuthContext);
}


const reducer = (state, action) => {

    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLogged:true,
                user:action.payload
            }
            
        case 'LOGOUT':
                return {
                    ...state,
                    isLogged:false,
                    user:null
                }
        default:
            return state;
            
    }

}
 



const AuthenticationProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const router= useRouter();



    const login=async(username, password)=>{
        try {
            const {data}=await bibliotecaApi.post('/user/login', {username, password}, {
                method: 'POST',
            });
            dispatch({type:'LOGIN', payload:data.user});
            
            
            Cookies.set('token', data.token);
         
            if(data.user.rol==='Alumno'){
                
                router.replace('/alumnoPage')
            }else{
                
                router.replace('/bibliotecarioPage')
            }
    
            return data.user;
            
        } catch (error) {
            return null;
        }
        
    
    }

    const logout=async()=>{
        Cookies.remove('token');
        dispatch({type:'LOGOUT'});
        router.replace('/');
    }


    const checkToken = async () => {
        const token = Cookies.get('token');
        
        if (token) {
          
          const {data}=await bibliotecaApi.get('/user/validarToken');
          if (data.user) {
           login(data.user.username, data.user.password);
          }else{
            logout();
          }

        }else{
            logout();
        }
      }



    return(
        <AuthContext.Provider value={{
            isLogged:state.isLogged,
            user:state.user,
            login,
            logout,
            checkToken
            

            
        }}>
            
            {children}

        </AuthContext.Provider>
    )


}


export {
    AuthenticationProvider,
    useAuthContext,
}