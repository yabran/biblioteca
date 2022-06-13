
import { db } from "../../../database";
import { Libro } from "../../../models";

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getLibro (req, res);
            
    
        default:
            res.status(400).json({message:'Error al procesar la peticion'})
    }
}

async function getLibro (req, res) {

    const id=req.query.id;
    await db.connect();
    const user= await Libro.findById(id);
    await db.disconnect();
    return res.status(200).json(user);
} 