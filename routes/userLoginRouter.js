const express = require('express');
const router = express.Router();
const passport = require('passport');

// class UserLogin {
//     constructor(id, mail) {
//         this.id = id;
//         this.mail = mail;
//     }
// }

router.get('/', (req, res) => {
    res.render('auth/home', { title: 'Login', user: req.user })
});

router.get('/auth', (req, res) => {
    res.render('auth/login', {title: 'Auth'})
});

router.post('/auth',
    passport.authenticate('local', { failureRedirect: '/auth' }),
    (req, res) => {
        console.log("req.user: ", req.user);
        res.redirect('/');
    }
);

router.get('/registration', (req, res) => {
    res.render('auth/registration', {title: 'Registration'});
});

router.get('/registration', 
    passport.authenticate('local', { failureRedirect: '/registration' }),
    (req, res) => {
        console.log('req.user :', req.user);
        res.redirect('/profile');
    }
)

router.get('/profile', 
    (req, res, next) => {
        if(!req.isAuthenticated()) {
            return res.redirect('/login/auth')
        }
        next()
    },
    (req, res) => {
        res.render('auth/profile', {
            user: req.user
        })
    }
);

// router.post('/user/login', (req, res) => {
//     //const {id, mail} = req.body;

//     const newUserLogin = new UserLogin(1, "test@mail.ru");
//     res.status(201);
//     res.json(newUserLogin);
//     //res.json({ id: 1, mail: "test@mail.ru" });
// });

module.exports = router;