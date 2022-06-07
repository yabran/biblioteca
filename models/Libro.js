import mongoose, { Schema, model } from 'mongoose';



const libroSchema = new Schema({

    titulo:{type:String, required:true},
    autor:{type:String, required:true},
    genero:{
        type:String,
        enum:['Novela','Cuentos', 'Fabulas','Poesia','Historia','Geografia', 'Cs Naturales', 'Cs Sociales', 'Psicologia','Biografía','Informatica', 'Matematica', 'Lengua', 'Historietas','Comunicacion', 'Educacion Civica','Otro'],
        message:'{VALUE} no es un genero valido'
    },
    editorial:{type:String},
    estante:{type:String, required:true},
    posicion:{type:Number, required: true},
    tags:[{type:String}],
    prestado:{type:Boolean, default:false},

},{
    timestamps:true
})


const Libro = mongoose.models.Libro || model('Libro',libroSchema);

export default Libro;