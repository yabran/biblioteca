import { db } from "../../../database";
import { Libro, Prestamo } from "../../../models";




export default function (req, res) {
    switch (req.method) {
        case 'POST':
            return guardarPrestamo(req, res);
            
            break;
    
        default:
            break;
    }
}



const guardarPrestamo = async (req, res) => {
    await db.connect();
    const prestamo = req.body;
    
    const prestamoGuardado = await Prestamo.create(prestamo);
    const libro=await Libro.findOneAndUpdate({_id:prestamo.idLibro}, { prestado: true });
    prestamoGuardado.save();
    await db.disconnect();
    

    return res.status(200).json(libro);
    
}