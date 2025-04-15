const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Symptom = sequelize.define('Symptom', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true
    },
    severity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 10
        }
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
        trim: true
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
Symptom.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Symptom, { foreignKey: 'userId' });

module.exports = Symptom; 