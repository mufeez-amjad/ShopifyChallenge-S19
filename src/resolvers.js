import Product from './models/product';
import Cart from './models/cart';
import User from './models/user';

export const resolvers = {
    Query: {
        async allProducts(_, { inStock }) { //TODO: combine queries for one product and all products
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
        async getCart() {
            return await Cart.find();
        },
        async getUsers() {
            return await User.find();
        }
    },
    Mutation: {
        async createProduct(_, { input }) {
            return await Product.create(input);
        },
        async updateProduct(_, { title, input }) { //FIXME: 
            return await Product.findOneAndUpdate({
                query: { "title": title },
                update: { input },
                new: true
            })
        },
        // async purchaseProduct(_, { title, quantity }) {

        // },
        async deleteProduct(_, { title }) { //FIXME: 
            return await Product.deleteMany({
                "title": title
            }).acknowledged;
        },
        async deleteAll() { //FIXME: 
            return await Product.deleteMany().acknowledged;
        },
        async createUser(_, { input }) {
            return await User.create(input);
        },
        async createCart(_, username) {
            return await Cart.create({
                "user": username.toString(),
                "total": 0
            });
        },
        // async addToCart(id) {
        //     return await Cart.;
        // }
    }
}