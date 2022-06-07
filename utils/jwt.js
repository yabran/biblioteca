import jwt from 'jsonwebtoken';


export const signToken = ( username, password ) => {

    if ( !process.env.JWT_SECRET_SEED ) {
        throw new Error('No hay semilla de JWT - Revisar variables de entorno');
    }

    return jwt.sign(
        // payload
        { username, password },

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

                const { username, password } = payload;

                resolve({ username, password });

            })
        } catch (error) {
            reject('JWT no es válido');
        }


    })

}
