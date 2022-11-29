const { Users, ProductsInOrder, Order, Products, Cart, ProductsInCart } = require("../models");

class UserServices {
  static async create(user) {
    try {
      const result = await Users.create(user);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getAllOrders(id) {
    try {
      const result = await Users.findOne({
        where: { id },
        attributes: ["name"],
        include: {
          model: Order,
          as: "order",
          attributes: ["totalPrice","status"],
          include: {
            model: ProductsInOrder,
            as: "productOrder",
            attributes: ["productId", "quantity", "price"],
          }

        }
      })
      return result
    } catch (error) {
      throw (error)
    }
  }

  static async getCart(id) {
    try {
      const result = await Users.findOne({
        where: { id },
        attributes: ["name"],
        include: {
          model: Cart,
          as: "cart",
          attributes: ["totalPrice", "status"],
          include: {
            model: ProductsInCart,
            as: "products",
            attributes: ["productId", "quantity", "price","status"],
          }
        }
      })
      return result
    } catch (error) {
      throw (error)
    }
  }

  static async addToCart(newItem){
    try {
      const result = await ProductsInCart.create(newItem);
      return result;
    } catch (error) {
      throw(error);
    }
  }

  static async purchaseCart(){
    try {
      const result = await ProductsInCart.update({status: "purchased"}, {
        where:{
          status: "in queue"
        }
      });
      const cart = await Cart.update({status:"purchased"},{where:{
        status:"Pending"
      }})
      return result, cart;
    } catch (error) {
      throw(error);
    }
  }
}

module.exports = UserServices;