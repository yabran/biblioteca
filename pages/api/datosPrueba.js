import {db, datosPrueba } from '../../database';
import {Libro, Usuario} from '../../models';







export default async function handler (req, res) {
    
    await db.connect()

    await Libro.deleteMany({});
    await Libro.insertMany(datosPrueba.libros);
    await Usuario.deleteMany({});
    await Usuario.insertMany(datosPrueba.usuarios);
    
    await db.disconnect();

    res.status(200).json({
        message: 'Datos de prueba cargados correctamente'
    });

}