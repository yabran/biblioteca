import { useEffect } from "react";


import ListBooks from "../../components/list/ListBooks";
import { useAuthContext } from "../../context/auth/AuthenticationProvider";
import { BibliotecarioLayout } from "../../layouts/BibliotecarioLayout";

const Libros = ()=>{

    const {checkToken}=useAuthContext()

    useEffect(() => {
        checkToken();
    
    }, [])
    

    return(
        <div>
            <BibliotecarioLayout>
                <ListBooks/>
            </BibliotecarioLayout>
            
        </div>
    )
}


export default Libros;