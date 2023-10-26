require('dotenv').config();

//Base 
const express = require('express');
const app = express();
const booksRouter = require('./routes/booksRouter');
const userLoginRouter = require('./routes/userLoginRouter');
const routesIndex = require('./routes/routesIndex');
//const errorMiddleware = require('./middleware/error');
const path = require('path');
const mongoose = require('mongoose');

//Authorization initialization
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ldb = require('./db');

//View engine setup
app.set('view engine', 'ejs');

//App configuration
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', routesIndex);
app.use('/login', userLoginRouter);
app.use('/books', booksRouter); 
//app.use('/api/books', booksRouter);
// app.use('/booksfilesuploads', express.static(__dirname, '/booksfilesuploads'));

//app.use(errorMiddleware);

//Authorization realization
const verify = (username, password, done) => {
    ldb.users.findByUsername(username, (err, user) => {
        if (err) {
            return done(err);
        };
        if (!user) {
            return done(null, false);
        };
        if(!ldb.users.verifyPassword(user, password)) {
            return done(null, user)
        }
    })
};

const options = {
    usernameField: "username",
    passwordField: "password",
};

passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
    cb(null, user.id)
});
passport.deserializeUser((id, cb) => {
    ldb.users.findById(id, (err, user) => {
        if(err) { return cb(err) }
        cb(null, user)
    })
});

//Mongoose database connection
const db = mongoose.connection;

//Start application function
const startApp = async (PORT, UrlDB) => {
    try {
        await mongoose.connect(UrlDB, { useNewUrlParser: true });
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`);
        })
    } catch(err) {
        console.log(err);
    }
};

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const PORT = process.env.PORT || 5000; 
startApp(PORT, process.env.DATABASE_URL);