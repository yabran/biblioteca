import mongoose, { Schema, model } from 'mongoose';




const prestamoSchema= new Schema({

    idLibro:{ type: Schema.Types.ObjectId, ref: 'Libro' },
    nombre:{type:String, required:true},
    curso:{type:String, required:true},
    


},
{
    timestamps: true,
}
)


const Prestamo = mongoose.models.Prestamo || model('Prestamo',prestamoSchema);

export default Prestamo;