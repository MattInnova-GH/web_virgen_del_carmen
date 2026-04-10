const {DataTypes} = require('sequelize');
const sequelize = require('../config/db.config');

const Contacts = sequelize.define('Contacts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    icon_img_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phone: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    facebook: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    instagram: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tiktok: {
        type: DataTypes.TEXT,
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
    tableName: 'contacts',
    timestamps: true
});

module.exports = Contacts;
