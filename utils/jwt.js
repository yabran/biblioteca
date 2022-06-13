import jwt from 'jsonwebtoken';


export const signToken = ( username, password, rol ) => {

    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }
 
    return jwt.sign(
        // payload
        { username, password, rol },

        // Seed
        process.env.JWT_SECRET_SEED,

        // Opciones
        { expiresIn: '30d' }
    )

}



export const isValidToken = ( token ) => {
    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    if ( token.length <= 10 ) {
        return Promise.reject('JWT no es válido');
    }

    return new Promise( (resolve, reject) => {

        try {
            jwt.verify( token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
                if ( err ) return reject('JWT no es válido');

                const { username, password, rol } = payload;
                console.log('envianado', username, password, rol)
                return resolve({ username, password, rol });

            })
        } catch (error) {
            console.log('enviando error')
            return reject('JWT no es válido');
        }


    })

}
