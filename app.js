const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');

const HttpError = require('./models/http-error');
const productsRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');
const categoryRoutes = require('./routes/categories-routes');

const app = express();

//bodyParser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Access-Control
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/api/products', productsRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/users', usersRoutes);

//page not found error
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

//the unknown error
app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err);
        });
    }
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

//connection to the database
mongoose
    .connect(
        `mongodb+srv://Ayoub-Jouini:FirstDataBase@cluster0.sz0b5.mongodb.net/project-1-database?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });