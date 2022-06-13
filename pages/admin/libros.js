import { useEffect } from "react";
import { jwtUtils } from "../../utils";


import ListBooks from "../../components/list/ListBooks";
import { useAuthContext } from "../../context/auth/AuthenticationProvider";
import { BibliotecarioLayout } from "../../layouts/BibliotecarioLayout";
import { Button } from "@mui/material";

const Libros = ()=>{

    const {checkToken}=useAuthContext()

    useEffect(() => {
        checkToken();
    
    }, [])
    

    return(
        <div>
            <BibliotecarioLayout section={'libros'}>
                
                <ListBooks />
            </BibliotecarioLayout>
            
        </div>
    )
}

export const getServerSideProps = async ({ req }) => {

        const { token = '' } = req.cookies;
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
    


export default Libros;