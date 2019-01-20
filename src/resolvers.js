import Product from './models/product';
import Cart from './models/cart';
import User from './models/user';

import { ApolloError } from 'apollo-server'

export const resolvers = {
    Query: {
        async getAllProducts(_, { inStock }) {
            if (!inStock) {
                return await Product.find()
            } else {
                return await Product.find({
                    "inventory_count" : { $gt: 0 }
                })
            }
            
        },
        async getProduct(_, { title }) {
            var query = { title: title }
            return await Product.findOne(query).then( (doc) => { //TODO: fix error with error
                if (!doc) {
                    throw new ApolloError("The product does not exist!");
                }
                
                return doc;
            });
        },
        async getCart(_, { username }) {
            var query = { user: username }
            return await Cart.findOne(query).then( (doc) => {
                if (!doc) {
                    throw new ApolloError(`There is no cart for ${username}.`)
                }
            });
        },
        async getUsers() {
            return await User.find();
        }
    },
    Mutation: {
        async createProduct(_, { input }) {
            return await Product.create(input);
        },
        async updateProduct(_, { title, input }) { 
            var query = { title: title };
            console.log(input);
            return await Product.findOneAndUpdate(query, input, {new: true}, (error, doc) => {
                if (error) {
                    throw new ApolloError("There was an error updating the product!");
                }
                if (!doc) {
                    throw new ApolloError("That product does not exist!");
                }
                else {
                    return doc;
                }
            });
        },
        async purchaseProduct(_, { title, quantity }) {
            var query = { title: title };
            let result = await Product.findOne(query);
            if (!result) {
                throw new ApolloError("This item does not exist!")
            }
            if (result.inventory_count <= 0) {
                throw new ApolloError("This item is out of stock!");
            }
            else {
                return await Product.update(
                    query,
                    { 
                        $inc: { inventory_count: -quantity }
                    },
                );
            }
        },
        async deleteProduct(_, { title }) {
            var query = { title: title }
            return await Product.deleteMany(query);
        },
        async deleteAll() {
            return await Product.remove({});
        },
        async createUser(_, { input }) {
            return await User.create(input);
        },
        async createCart(_, { username }) {
            var query = { username: username }
            let user =  await User.findOne(query);

            if (!user) {
                throw new ApolloError("No such user exists!");
            }
            return await Cart.create({
                user: username,
            });
        },
        async addToCart(_, { username, input }) {
            var productQuery = { title: input.title.toString() }
            var { price, inventory_count } = await Product.findOne(productQuery);
            var subTotal = price*input.quantity
            var query = { user: username }

            if (inventory_count <= 0) {
                throw new ApolloError("This item is out of stock!");
            }

            if (input.quantity > inventory_count) {
                throw new ApolloError(`There is only ${inventory_count} left in stock!`);
            }

            return await Cart.findOneAndUpdate(
                query,
                {
                    $push: { 
                        items: {
                            title: input.title,
                            quantity: input.quantity,
                            subTotal: subTotal,
                        }
                    },
                    $inc: { total: subTotal }
                }
            );
        },
        async completeCart(_, { username }) {
            var query = { user: username }

            let cart =  await Cart.findOne(query);
            if (!cart) {
                throw new ApolloError("Cart does not exist!");
            }
            let items = cart.items;
            if (!items.length) {
                throw new ApolloError("Cannot complete an empty cart!");
            }
            
            for (let item of items) {
                await Product.findOneAndUpdate(
                    { title: item.title },
                    {
                        $inc: { inventory_count: -item.quantity }
                    }
                    
                );
            }

            let total = cart.total;
            cart.remove();

            return `Cart completed successfully, total was: $${total}`
        }
    }
}