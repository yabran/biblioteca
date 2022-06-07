import mongoose, { Schema, model } from 'mongoose';



const usuarioSchema= new Schema({

    nombre:{type:String, required:true},
    apellido:{type:String, required:true},
    password:{type:String, required:true},
    username:{type:String, required:true},
    rol:{
        type:String,
        values:['Bibliotecario','Alumno'],
    }


})


const Usuario = mongoose.models.Usuario || model('Usuario',usuarioSchema);

export default Usuario;