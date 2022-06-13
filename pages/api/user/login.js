import {Usuario} from '../../../models';
import {db} from '../../../database';
import { jwtUtils } from '../../../utils';

export default function handler (req, res) {
    
    switch (req.method) {
        case 'POST':
            return login(req, res);
    }



}


const login= async (req, res) => {

    const {username, password} = req.body;
    (username, password);

    await db.connect();

    const user = await Usuario.findOne({username, password});
    if(!user){
        return res.status(401).json({message:'Usuario o contraseña incorrectos'});
    }

    await db.disconnect();

    const token=jwtUtils.signToken(username, password, user.rol);
    return res.status(200).json({user, token});

}
