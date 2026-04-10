require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const sequelize = require('./config/db.config');
const appRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos

// cambios en rutas
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
            },
        },
    })
);
app.use(express.json());
app.use(morgan('dev'));

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'static')));

app.use('/api', appRoutes.NewsRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'dashboard.html'))
});

sequelize.authenticate()
    .then(() => {
        console.log('DB conectada');

        app.listen(PORT, () => {
            console.log(`Servidor en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error DB:', err.message);
    });

module.exports = app;