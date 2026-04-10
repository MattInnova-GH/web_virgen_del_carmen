const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const AcademicPersonal = sequelize.define('Academic_personal', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Autoridad', 'Docente'),
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
