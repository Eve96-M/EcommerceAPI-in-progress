const db = require("../utils/database");
const products = require("./products.models");
const cart = require("./cart.models");
const { DataTypes } = require("sequelize");

const productsInCart = db.define("productsInCart", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "cart_id",
        references: {
            model: cart,
            key: "id"
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "product_id",
        references: {
            model: products,
            key: "id"
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

module.exports = productsInCart
