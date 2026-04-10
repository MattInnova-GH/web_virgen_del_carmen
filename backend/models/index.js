const sequelize = require('../config/db.config');
const {Sequelize} = require('sequelize');

const News = require('./news.models');
const Contacts = require('./contacts.model');
const Investigations = require('./investigations.models');
const Users = require('./users.model');
const Press_Release = require('./press_releases.model');
const Comments = require('./comments.model');
const AcademicPeronal = require('./academic_personal.model');
const Career = require('./career.model');

module.exports = {
    sequelize,
    Sequelize,
    News,
    Contacts,
    Investigations,
    Users,
    Press_Release,
    Comments,
    AcademicPeronal,
    Career
}