
const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Grade = sequelize.define('grades', {

    grade_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course_id: {
        type: DataTypes.STRING,
        foreignKey: true,
    },
    class_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
    },
    username: {
        type: DataTypes.STRING,
        foreignKey: true,
    },
    grade : {
        type : DataTypes.FLOAT,
        default : 0.00
    },
    credit : {
        type : DataTypes.FLOAT,
        foreignKey : true
    }
});

module.exports = Grade;
