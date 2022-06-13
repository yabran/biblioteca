
import { useEffect } from "react";
import ListUsers from "../../components/list/ListUsers";
import { useAuthContext } from "../../context/auth/AuthenticationProvider";
import { BibliotecarioLayout } from "../../layouts/BibliotecarioLayout";
import { jwtUtils } from "../../utils";

const UsuariosPage = ()=>{

    
    

    return(
        <div>
            <BibliotecarioLayout section='usuarios'>
                <ListUsers/>
            </BibliotecarioLayout>
            
        </div>
    )
}


export const getServerSideProps = async ({ req }) => {

    const { token = '' } = req.cookies;
    console.log('token', token)
    let isValidToken = false;

    try {
        const {rol} =await jwtUtils.isValidToken( token );
        isValidToken = true;
        console.log('rol', rol)
        if(rol !== 'Bibliotecario'){
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }
    } catch (error) {
        isValidToken = false;
    }

    if ( !isValidToken ) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }
}

 
export default UsuariosPage;