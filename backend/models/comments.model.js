const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const News = require('./news.models');

const Comments = sequelize.define('Comments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    new_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: News,
            key: 'id'
        }
    },
    nickname: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    comment: {
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
    tableName: 'comments',
    timestamps: true
});

Comments.belongsTo(News, {
    foreignKey: 'new_id',
    as: 'news',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})

module.exports = Comments;
