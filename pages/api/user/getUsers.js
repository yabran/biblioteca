import { db } from "../../../database"
import { Usuario } from "../../../models";

export default async function handler(req, res) {
    db.connect();
    const users=await Usuario.find();
    db.disconnect();
    
    return res.status(200).json({ users })
}