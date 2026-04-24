const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const AcademicPersonal = sequelize.define('AcademicPersonal', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Autoridad', 'Docente', 'Administrativo'),
        allowNull: false
    },
    names: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    last_names: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    grade: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    img_url: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'academic_personal',
    timestamps: true
});

module.exports = AcademicPersonal;
