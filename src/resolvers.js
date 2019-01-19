import Product from './models/product';
import Cart from './models/cart';
import User from './models/user';

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
            return await Product.findOneAndUpdate(
                query,
                { 
                    $inc: { inventory_count: -quantity }
                },
            );
        },
        async deleteProduct(_, { title }) {
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
            console.log(price)
            var query = { user: username }

            if (inventory_count <= 0) {
                throw console.error("That item is sold out.");
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
        }
    }
}