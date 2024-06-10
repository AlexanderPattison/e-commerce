'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // define association here
        }
    }

    Product.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Product',
        timestamps: true, // Ensure timestamps are enabled
    });

    return Product;
};
