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
    await db.connect();
    const {id}=(req.query)
    const book= await Libro.findById(id);
    await db.disconnect();
    return res.status(200).json(book);
}

