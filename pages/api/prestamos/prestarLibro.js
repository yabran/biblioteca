import { db } from "../../../database";
import { Libro, Prestamo } from "../../../models";




export default function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return guardarPrestamo(req, res);
            
            break;
    
        default:
            break;
    }
}



const guardarPrestamo = async (req, res) => {
    
    try {
        await db.connect();
        const prestamo = req.body;
        console.log(prestamo)
        
        const prestamoGuardado = await Prestamo.create(prestamo);
        const libro=await Libro.findOneAndUpdate({_id:prestamo.idLibro}, { prestado: true, prestamo:prestamoGuardado._id });
        prestamoGuardado.save();
        await db.disconnect();
        
    
        return res.status(200).json(libro);
        
    } catch (error) {
        return res.status(500).json({error})
    }
        
    
    
}