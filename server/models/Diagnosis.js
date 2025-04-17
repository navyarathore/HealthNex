const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Diagnosis = sequelize.define('Diagnosis', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    condition: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
    },
    confidence: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100
        }
    },
    symptoms: {
        type: DataTypes.JSON, // Store symptoms as a JSON array
        allowNull: false
    },
    recommendations: {
        type: DataTypes.JSON, // Store recommendations as a JSON array
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: true
});

// Define associations
Diagnosis.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Diagnosis, { foreignKey: 'userId' });

module.exports = Diagnosis;