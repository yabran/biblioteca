import { db } from "../../../database"
import { Libro } from "../../../models"




export default async function handler (req, res) {


    switch (req.method) {
        case 'GET':
            return getLibros(req, res);
            
        
    
        default:
            res.status(400).json({message:'Error al procesar la peticion'})
    }

    await db.connect();
    const libros= await Libro.find();
    await db.disconnect();


    
}


const getLibros = async (req, res) => {

    const {genero, editorial, autor}= req.query;
    

    if (editorial && genero) {
        const libros = await Libro.find({
            genero:{ "$regex": `${genero}`, "$options": "i" },
            editorial:{ "$regex": `${editorial}`, "$options": "i" }
        
        });
        return res.status(200).json(libros);
    }



    if (genero) {
        const libros = await Libro.find({genero});
        
        return res.status(200).json(libros);
    }

    if (editorial) {
        const libros = await Libro.find({editorial});
        return res.status(200).json(libros);
    }

    if (autor) {
        const libros = await Libro.find({autor:{ "$regex": `${autor}`, "$options": "i" }});
        return res.status(200).json(libros);
    }



    await db.connect();
    const libros= await Libro.find();
    await db.disconnect();
    res.status(200).json( libros )
}