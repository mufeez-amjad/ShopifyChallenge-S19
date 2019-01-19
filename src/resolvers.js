import Product from './models/product';
import Cart from './models/cart';
import User from './models/user';

import { ApolloError } from 'apollo-server'

export const resolvers = {
    Query: {
        async allProducts(_, { inStock }) {
            if (!inStock) {
                return await Product.find()
            } else {
                return await Product.find({
                    "inventory_count" : { $gt: 0 }
                })
            }
            
        },
        async getProduct(_, { title }) {
            return await Product.findOne({ title: title.toString() });
        },
        async getCart(_, { username }) {
            var query = { user: username }
            return await Cart.findOne(query);
        },
        async getUsers() {
            return await User.find();
        }
    },
    Mutation: {
        async createProduct(_, { input }) {
            return await Product.create(input);
        },
        async updateProduct(_, { title }, { input }) { //FIXME: 
            var query = { title: title };
            return await Product.findOneAndUpdate({
                query,
                update: { input },
                new: true
            });
        },
        async purchaseProduct(_, { title, quantity }) { //TODO: can't purchase out of stock
            var query = { title: title };
            if (quantity == null) {
                quantity = 1;
            }
            let result = await Product.findOne(query);
            
            if (result.inventory_count <= 0) {
                throw new ApolloError('This item is out of stock!');
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
        async deleteProduct(_, { title }) { //TODO: return true or false based on callback
            return await Product.deleteMany({
                title: title
            });
        },
        async deleteAll() { //FIXME:
            return await Product.remove({});
        },
        async createUser(_, { input }) {
            return await User.create(input);
        },
        async createCart(_, { username }) {
            return await Cart.create({
                user: username,
                total: 0
            });
        },
        async addToCart(_, { username, input }) {
            var productQuery = { title: input.title.toString() }
            var { price, inventory_count } = await Product.findOne(productQuery);
            var subTotal = price*input.quantity
            var query = { user: username }

            if (inventory_count <= 0) {
                throw new ApolloError('This item is out of stock!');
            }

            if (input.quantity > inventory_count) {
                input.quantity = inventory_count;
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
            if (cart == null) {
                throw new ApolloError('Cart does not exist!');
            }
            let items = cart.items;
            if (items.length  == 0) {
                throw new ApolloError('Cannot complete an empty cart!');
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