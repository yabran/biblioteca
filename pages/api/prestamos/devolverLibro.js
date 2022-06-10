import {Prestamo, Libro} from '../../../models'
import {db} from '../../../database'

export default function (req, res) {
    switch (req.method) {
        case 'GET':
            return devolverLibro(req, res);
            
            break;
    
        default:
            break;
    }
    res.status(200).json({ name: 'Example' })
}


const devolverLibro = async (req, res) => {
    

    try {
        const { id } = req.query;
        console.log(id)
        await db.connect();
        await Prestamo.findOneAndDelete({idLibro:id})
        const libroMod=await Libro.findByIdAndUpdate({_id:id},{prestado:false})
        await db.disconnect();
        return res.status(200).json({data:libroMod})
        
    } catch (error) {
        return res.status(500).json({error})
    }


}