
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
    },
    users:[],
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
        case 'GET_USERS':
            return{
                ...state,
                users:action.payload
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
                
                router.replace('/admin/libros')
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

      const addUser=async(user)=>{
          console.log(user)
        try {
            const {data}=await bibliotecaApi.post('/user/add', user);
            return data;
        } catch (error) {
            return null;
        }
        
    
    
      }

      const editUser=async(user,id)=>{
          try {
            const {data}=await bibliotecaApi.put('/user/edit?id='+id, user);
            return data;
        }
         catch (error) {
              
        }
      }

      const getUser=async(id)=>{
        try {
            const {data}=await bibliotecaApi.get('/user/getUser?id='+id);
            return data;
        } catch (error) {
            return null;
        }
      }

      const getUsers=async()=>{
        try {
            const {data}=await bibliotecaApi.get('/user/getUsers');
            dispatch({type:'GET_USERS', payload:data.users});
            return data;
        } catch (error) {
            return null;
        }
      }
      



    return(
        <AuthContext.Provider value={{
            isLogged:state.isLogged,
            user:state.user,
            users:state.users,
            login,
            logout,
            checkToken,
            addUser,
            editUser,
            getUser,
            getUsers
            

            
        }}>
            
            {children}

        </AuthContext.Provider>
    )


}


export {
    AuthenticationProvider,
    useAuthContext,
}