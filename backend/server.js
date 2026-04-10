require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const sequelize = require('./config/db.config');
const appRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;
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

// archivos estáticos
app.use(express.static(path.join(__dirname, 'static')));

app.use('/api', appRoutes.AcademicPersonalRoutes);
app.use('/api', appRoutes.CareerRoutes);
app.use('/api', appRoutes.CommentsRoutes);
app.use('/api', appRoutes.ContactsRoutes);
app.use('/api', appRoutes.InvestigationsRoutes);
app.use('/api', appRoutes.NewsRoutes);
app.use('/api', appRoutes.PressReleasesRoutes);
app.use('/api', appRoutes.UsersRoutes);

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