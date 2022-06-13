import { db } from "../../../database";
import { Libro } from "../../../models";



export default function handler(req, res) {
    
    
    switch( req.method ) {
        case 'GET':
            return getBookById(req, res);

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

} 


async function getBookById(req, res) {
    try {
        await db.connect();
        const {id}=(req.query)
        const book= await Libro.findById(id);
        console.log(book)
        await db.disconnect();
        return res.status(200).json(JSON.parse(JSON.stringify(book)));
        
    } catch (error) {
        return res.status(500).json({'message':'Error al obtener el libro'});
    }
}

