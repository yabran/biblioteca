import React, {useEffect} from 'react';



import Info from '../../../components/libro/Info'
import {db} from '../../../database'

import { BibliotecarioLayout } from '../../../layouts/BibliotecarioLayout'
import {Libro} from '../../../models'




const PrestamoLibroPage=({libro})=> {

    

    
  return (
      <div>
         <BibliotecarioLayout>
                <Info libro={libro}/>
         </BibliotecarioLayout>

        
            
        
      </div>
  )
}



export const getServerSideProps = async (ctx) => {
    const {id}=ctx.query;
    
    await db.connect();
    const libro= JSON.parse(JSON.stringify(await Libro.findById(id)));
    await db.disconnect();
    
    
    return {
        props: {
         libro
        }
    }
}

export default PrestamoLibroPage