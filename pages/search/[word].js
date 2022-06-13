import React, {useEffect} from 'react';





import ListBooks from '../../components/list/ListBooks';
import {db} from '../../database'

import { AlumnoLayout } from '../../layouts/AlumnoLayout'
import {Libro} from '../../models'




const SearchPage=({libros})=> {
 
   

    
  return (
    <div>
    <AlumnoLayout>
        <ListBooks search={libros} alumno={true}/>
    </AlumnoLayout>
    
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

export default SearchPage