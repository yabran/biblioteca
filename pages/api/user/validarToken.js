import { db } from "../../../database";
import { Usuario } from "../../../models";
import { jwtUtils } from "../../../utils";


export default function (req, res) {
    switch (req.method) {
        case 'GET':
            return validarToken(req, res);
            
    
        default:
            break;
    }
}


const validarToken = async (req, res) => {
    const token = req.cookies.token;
    
    
    if (!token) {
        return res.status(401).json({message: 'No hay token'});

    }

    try {
        const { username, password } = await jwtUtils.isValidToken(token);
        await db.connect();
        const user = await Usuario.findOne({username, password});
        await db.disconnect();
        if (!user) {
            return res.status(401).json({message: 'Token no válido', user});
        }else {
            return res.status(200).json({message: 'Token válido', user});
        }
      

        
    } catch (error) {
        return res.status(401).json({message: 'Error al leer la base de datos'});
    }
        
}
   
  
    
