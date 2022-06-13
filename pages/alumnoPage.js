
import { useEffect } from "react";
import ListBooks from "../components/list/ListBooks";
import { useAuthContext } from "../context/auth/AuthenticationProvider";
import { AlumnoLayout } from "../layouts/AlumnoLayout";

const AlumnoPage = ()=>{

    const {checkToken}=useAuthContext()

    useEffect(() => {
        checkToken();
    
    }, [])
    

    return(
        <div>
            <AlumnoLayout>
                <ListBooks alumno={true}/>
            </AlumnoLayout>
            
        </div>
    )
}




export default AlumnoPage;