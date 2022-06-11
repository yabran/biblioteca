import { db } from "../../../database"
import { Usuario } from "../../../models"

export default async function handler(req, res) {
    await db.connect();
    const user = req.body;
    const {id}=(req.query)
    const updateUser = await Usuario.findByIdAndUpdate(id, user);
    await db.disconnect();
    return res.status(200).json(updateUser);
    
    
}