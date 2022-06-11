import { db } from "../../../database";
import { Usuario } from "../../../models";

export default function handler(req, res) {
    switch (req.method){ 
        case 'POST':
            return addUser(req, res);
        default:
            res.status(400).json({message:'Error al procesar la peticion'})
    }
}


async function addUser(req, res) {
    try {
        console.log('entre a add user')
        const user=req.body;
        console.log('valor de user',user)
        await db.connect();
        const newUser=await Usuario.create(user);
        await db.disconnect()
        console.log(newUser)
        return res.status(200).json(newUser);

    } catch (error) {
        return res.status(400).json({message:'Error al crear el usuario'})
    }
}