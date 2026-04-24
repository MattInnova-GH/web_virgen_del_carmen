require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors'); 
const path = require('path');

const sequelize = require('./config/db.config');
const appRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// middleware
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

app.use('/api', appRoutes.AcademicPersonalRoutes);
app.use('/api', appRoutes.CareerRoutes);
app.use('/api', appRoutes.CommentsRoutes);
app.use('/api', appRoutes.ContactsRoutes);
app.use('/api', appRoutes.InvestigationsRoutes);
app.use('/api', appRoutes.NewsRoutes);
app.use('/api', appRoutes.PressReleasesRoutes);
app.use('/api', appRoutes.UsersRoutes);

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