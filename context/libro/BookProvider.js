
import {createContext, useReducer, useContext, useEffect,} from 'react';
import bibliotecaApi from '../../api/bibliotecaApi';





const BookContext = createContext();

const initialState = {
    books: [],
    filter: 'ALL',
}


const useBookContext = () => {
    return useContext(BookContext);
}


const reducer = (state, action) => {

    switch (action.type) {
        case 'ADD_BOOK':
            return {
                ...state,
                books: [...state.books, action.payload],
            }
        case 'SET_FILTER':
            return{
                ...state,
                filter: action.payload,
            }            
        case 'REMOVE_BOOK':
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload),
            }
        case 'EDIT_BOOK':
            return {
                ...state,
                books: state.books.map(book => book.id === action.payload.id ? action.payload : book),
            }
        case 'SET_BOOKS':
            return{
                ...state,
                books: action.payload,

            }
        case 'Prestar_Libro':
            return{
                ...state,
                books: state.books.map(book => book.id === action.payload._id ? {...book, prestado:true} : book)
            }
        case 'Devolver_Libro':
            return{
                ...state,
                books: state.books.map(book => book.id === action.payload._id ? {...book, prestado:false} : book)
            }

        default:
            return state;
    }

}

const BookProvider = ({children}) => {
    
        const [state, dispatch] = useReducer(reducer, initialState);

       
        

         const getAllBooks = async () => {
            const {data} = await bibliotecaApi.get('/books');
            dispatch({type: 'SET_BOOKS', payload: data});
         }


         const addBook = async (book) => {
             
            const {data} = await bibliotecaApi.post('/books', book);
            dispatch({type: 'ADD_BOOK', payload: data});

         } 

         const removeBook = async (id) => {
             
            await bibliotecaApi.delete(`/books?id=${id}`);
            dispatch({type: 'REMOVE_BOOK', payload: id});
         }

            const editBook = async (book, id) => {
                await bibliotecaApi.put(`/books?id=${id}`, book);
                dispatch({type: 'EDIT_BOOK', payload: book});
            }

        const getBookById = async (id) => {
            const {data}=await bibliotecaApi.get('/books/getBook?id='+id);
            return data;
        }

        const prestarLibro=async(prestamo)=>{
            
            try {
                const {data} = await bibliotecaApi.post('/prestamos/prestarLibro', prestamo);
                
                
                data.prestado=true;
                
                const book={
                    id:data._id,

                }
                const booksMod=dispatch({type: 'Prestar_Libro', payload: data});
                
                return data;
                
            } catch (error) {
                console.log('Error en servidor:', error)
            }
           
        }

        const devolverLibro=async(id)=>{
            try {
                const { data}= await bibliotecaApi.get(`/prestamos/devolverLibro?id=${id}`);   
                console.log('data del servidor',data)
                data.prestado=false;
                const booksMod=dispatch({type: 'Devolver_Libro', payload: data});
                

            } catch (error) {
                console.log('Error en servidor:', error)
                return error;
            }
                
            
        }


        return(
            <BookContext.Provider value={{
                books: state.books,
                filter: state.filter,
                getAllBooks,
                addBook,
                removeBook,
                editBook,
                getBookById,
                prestarLibro,
                devolverLibro,
            }}>
            
                {children}
            
            </BookContext.Provider>
        )
}

export {
    BookProvider, 
    useBookContext
};

