import { getListSubheaderUtilityClass } from "@mui/material";
import { db } from "../../../database";
import { Usuario } from "../../../models";

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getUser (req, res);
            
    
        default:
            res.status(400).json({message:'Error al procesar la peticion'})
    }
}

async function getUser (req, res) {

    const id=req.query.id;
    await db.connect();
    const user= await Usuario.findById(id);
    await db.disconnect();
    return res.status(200).json(user);
} 