
import { useEffect } from "react";
import ListUsers from "../../components/list/ListUsers";
import { useAuthContext } from "../../context/auth/AuthenticationProvider";
import { BibliotecarioLayout } from "../../layouts/BibliotecarioLayout";

const UsuariosPage = ()=>{

    
    

    return(
        <div>
            <BibliotecarioLayout>
                <ListUsers/>
            </BibliotecarioLayout>
            
        </div>
    )
}


export default UsuariosPage;