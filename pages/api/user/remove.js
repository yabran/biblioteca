import {db} from '../../../database';
import {Usuario} from '../../../models';

export default function handler(req, res) {
    
        switch (req.method){
            
            case 'DELETE':
                return removeUser(req, res);
            default:
                return res.status(400).json({message:'Error al procesar la peticion'})
        }
    
}


async function removeUser(req, res) {

    console.log('entre a remove')

    const {id}=req.query;

    console.log('id', id)
    try {
        await db.connect();
        const user=await Usuario.findOneAndDelete({_id:id});
        await db.disconnect();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message:'Error al eliminar el usuario'})
    }
        

}