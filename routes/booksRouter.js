const express = require('express');
const router = express.Router();
const fileUploadMulter = require('../middleware/bookFile');
//const { v4: uuid } = require('uuid');
const Book = require('../models/booksSchema');

// class Book {
//     constructor(
//         //id = uuid(), 
//         title = "", 
//         description = "",
//         authors = "",
//         favorite = "",
//         fileCover = "",
//         fileName = "",
//         fileBook = ""
//     ) {
//         //this.id = id;
//         this.title = title;
//         this.description = description; 
//         this.authors = authors;
//         this.favorite = favorite;
//         this.fileCover = fileCover;
//         this.fileName = fileName;
//         this.fileBook = fileBook;
//     }
// };

router.get('/', async (req, res) => {
    try {
        const books = await Book.find().select('-__v');
        res.json(books);
    } catch (err) {
        //console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const book = await Book.findById(id).select('-__v');
        res.json(book);
    } catch (err) {
        res.status(404).json(err + '404');
    }
});

router.post('/', async (req, res) => {
    const { 
        title, 
        description, 
        authors, 
        favorite, 
        fileCover, 
        fileName, 
        fileBook,
    } = req.body;

    const newBook = new Book({
        title, 
        description, 
        authors, 
        favorite, 
        fileCover, 
        fileName, 
        fileBook
    });

    try {
        await newBook.save()
        res.json(newBook);
    } catch (err) {

        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const { 
        title, 
        description, 
        authors, 
        favorite, 
        fileCover, 
        fileName, 
        fileBook 
    } = req.body;

    try {
        await Book.findByIdAndUpdate(id, { 
            title, 
            description, 
            authors, 
            favorite, 
            fileCover, 
            fileName, 
            fileBook 
        });
        res.redirect(`/books/${id}`)
    } catch (err) {
        res.status(404).json(err + '404');
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Book.deleteOne({_id: id});
        res.json(true);
    } catch (err) {
        res.status(500).json(err);
    }
})

// const library = {
//     book: [
//         {   
//             id: uuid(),
//             title: "Книга 1",
//             description: "Описание книги 1",
//             authors: "Автор 1",
//             favorite: "Да",
//             fileCover: "cover1.jpg",
//             fileName: "book1.pdf",
//             fileBook: "1"
//           },
//           {
//             id: uuid(),
//             title: "Книга 2",
//             description: "Описание книги 2",
//             authors: "Автор 2",
//             favorite: "Нет",
//             fileCover: "cover2.jpg",
//             fileName: "book2.pdf",
//             fileBook: "2"
//           }
//     ]
// };

// library.book.map(item => {
//     return `book ${item}`, `Book Title: ${item.title}`;
// });

// router.get('/', (req, res) => {
//     const {book} = library;
//     //res.json(book);
//     res.render('books/booksindex', {
//         title: 'All books',
//         books: book
//     })
// });

// router.get('/create', (req, res) => {// Вывод формы для создания новой записи
//     res.render('books/create', {
//         title: 'Book | create',
//         book: {},
//     })
// });

// router.post('/create', (req, res) => { //Создание новой записи
//     const {book} = library;
//     const {
//         id, 
//         title, 
//         description, 
//         authors, 
//         favorite, 
//         fileCover, 
//         fileName,
//         fileBook
//     } = req.body;

//     const newBook = new Book(
//         id, 
//         title, 
//         description, 
//         authors, 
//         favorite, 
//         fileCover, 
//         fileName,
//         fileBook
//     );
//     book.push(newBook);

//     res.redirect('/books');
// });

// router.get('/:id', (req, res) => {
//     const {book} = library;
//     const {id} = req.params; //Получаем id из адресной строки
//     const index = book.findIndex(el => el.id === id);

//     if(index === -1) {
//         res.redirect('/404');
//     }

//     res.render('books/viewCurrentBook', {
//         title: 'Book | View Information',
//         book: book[index] 
//     })
// });

// router.get('/update/:id', (req, res) => {
//     const {book} = library;
//     const {id} = req.params;
//     const index = book.findIndex(el => el.id === id);

//     if(index === -1){
//         res.redirect('/404');
//     }

//     res.render('books/updateBook', {
//         title: 'Book | View',
//         book: book[index],
//     })
// });

// router.post('/update/:id', (req, res) => {
//     const {book} = library;
//     const {id} = req.params;
//     const {title, description} = req.body;
//     const index = book.findIndex(el => el.id === id);

//     if(index === -1) {
//         res.redirect('/404')
//     }

//     book[index] = {
//         ...book[index],
//         title,
//         description,
//     };
//     res.redirect(`/books/${id}`);
// });

// router.post('/delete/:id', (req, res) => {
//     const {book} = library;
//     const {id} = req.params;
//     const index = book.findIndex(el => el.id === id);

//     if (index === -1) {
//         res.redirect('/404');
//     }

//     book.splice(index, 1);
//     res.redirect('/books');
// });

// RPREVIOUS VERSIONS OF REQUESTS
// router.get('/:id', (req, res) => {
//     const {book} = library;
//     const {id} = req.params;
//     const index = book.findIndex(el => el.id === id);

//     if(index !== -1) {
//         res.json(book[index]);
//     } else {
//         res.status(404);
//         res.json('404');
//     }
// });

// router.get('/:id/download', (req, res) => { 
//     const { book } = library;
//     const { id } = req.params;
//     const bookItem = book.find(el => el.id === id);

//     if (bookItem && bookItem.fileBook) {

//         const filePath = `booksfilesuploads/${bookItem.fileBook}`;
        
//         res.download(filePath, bookItem.fileName, (err) => {
//             if (err) {
//                 res.status(500).json('Ошибка при скачивании файла');
//             }
//         });
//     } else {
//         res.status(404).json('Книга не найдена');
//     }
// });

// router.post('/', fileUploadMulter.single('fileBook'), (req, res) => {
//     const {book} = library;
//     const {
//         id, 
//         title, 
//         description, 
//         authors, 
//         favorite, 
//         fileCover, 
//         fileName,
//         fileBook
//     } = req.body;

//     const newBook = new Book(
//         id, 
//         title, 
//         description, 
//         authors, 
//         favorite, 
//         fileCover, 
//         fileName,
//         fileBook
//     );
//     book.push(newBook);

//     res.status(201);
//     res.json(newBook);
// });

// router.put('/:id', (req, res) => {
//     const {book} = library;
//     const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body;
//     const {id} = req.params;
//     const index = book.findIndex(el => el.id === id);

//     if(index !== -1) {
//         book[index] = {
//             ...book[index],
//             title, 
//             description, 
//             authors, 
//             favorite, 
//             fileCover, 
//             fileName,
//             fileBook
//         }
//         res.json(book[index])
//     } else {
//         res.status(404);
//         res.json('404 | Record not found');
//     }
// });

// router.delete('/:id', (req, res) => {
//     const {book} = library;
//     const {id} = req.params;
//     const index = book.findIndex(el => el.id === id);

//     if(index !== -1) {
//         book.splice(index, 1);
//         res.json('ok')
//     } else {
//         res.status(404);
//         res.json('404 | Book not found')
//     }
// });

module.exports = router; 