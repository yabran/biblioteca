import React, {useEffect} from 'react';




import Info from '../../../components/libro/Info'
import ListBooks from '../../../components/list/ListBooks';
import {db} from '../../../database'

import { BibliotecarioLayout } from '../../../layouts/BibliotecarioLayout'
import {Libro} from '../../../models'




const PrestamoLibroPage=({libros})=> {

   

    
  return (
    <div>
    <BibliotecarioLayout>
        <ListBooks search={libros}/>
    </BibliotecarioLayout>
    
</div>
  )
}



export const getServerSideProps = async (ctx) => {
    const {word}=ctx.query;
    
    await db.connect();
    const libros = JSON.parse( JSON.stringify( await Libro.find({
        $or:[

            {titulo:{ "$regex": `${word}`, "$options": "i" }},
            {autor:{ "$regex": `${word}`, "$options": "i" }},
            {tags:{ "$regex": `${word}`, "$options": "i" }}
        ]
        
        
    
    })));
    await db.disconnect();
    
    
    return {
        props: {
         libros
        }
    }
}

export default PrestamoLibroPage