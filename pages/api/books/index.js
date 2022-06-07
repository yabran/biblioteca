
import { db } from "../../../database";
import {Libro} from "../../../models";




export default function (req, res) {
    switch (req.method) {
        case 'GET':
            return getBooks(req, res);
            
        case 'POST':
            return createBook(req, res);
        case 'DELETE':
            
            return deleteBook(req, res);
        case 'PUT':
            return updateBook(req, res);
    
        default:
            break;
    }
}


async function getBooks(req, res) {
    await db.connect();
    const books= await Libro.find();
    await db.disconnect();
    
    return res.status(200).json(books);

}




async function deleteBook(req, res) {
    await db.connect();
    
    const{id}=(req.query)
    const book= await Libro.findById(id);
    await book.remove();
    await db.disconnect();
    return res.status(200).json({message: 'Libro eliminado'});
}

async function updateBook(req, res) {
    await db.connect();
    const book = req.body;
    const {id}=(req.query)
    const updateBook = await Libro.findByIdAndUpdate(id, book);
    await db.disconnect();
    return res.status(200).json(updateBook);
}


async function createBook(req, res) {

    
    const book = req.body;

    
    await db.connect();
    const newBook = await Libro.create(book);
    await db.disconnect();
    return res.status(201).json(newBook);

}