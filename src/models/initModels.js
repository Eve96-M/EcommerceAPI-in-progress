const { Users, Order, Cart, Products, ProductsInCart, ProductsInOrder } = require("./index")

const initModels = () => {
    //1 to many relation => Users and products
    Products.belongsTo(Users, { as: "Buyer", foreignKey: "user_id" })
    Users.hasMany(Products, { as: "Products", foreignKey: "user_id" })

    //1 to 1 relation => Cart and Users
    Cart.belongsTo(Users, { as: "Owner", foreignKey: "user_id" })
    Users.hasOne(Cart, { as: "Cart", foreignKey: "user_id" })

    //1 to many relation => Order and Users
    Order.belongsTo(Users, { as: "User", foreignKey: "user_id" })
    Users.hasMany(Order, { as: "Order", foreignKey: "user_id" })

    //ProductInCart Relations
    ProductsInCart.belongsTo(Cart, { as: "Cart", foreignKey: "cart_id" })
    ProductsInCart.hasOne(Products, { as: "item", foreignKey: "product_id" })
    Cart.hasMany(ProductsInCart, { as: "Product", foreignKey: "cart_id" })

    //ProductsInOrder Relations
    ProductsInOrder.belongsTo(Order,{as:"Order", foreignKey:"order_id"})
    ProductsInOrder.hasOne(Products,{as:"Product", foreignKey:"product_id"})
    Order.hasMany(ProductsInOrder,{as:"Items", foreignKey:"order_id"})
}

module.exports = initModels