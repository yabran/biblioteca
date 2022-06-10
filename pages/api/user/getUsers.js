import { db } from "../../../database"
import { Usuario } from "../../../models";

export default async function (req, res) {
    db.connect();
    const users=await Usuario.find();
    db.disconnect();
    console.log(users)
    return res.status(200).json({ users })
}