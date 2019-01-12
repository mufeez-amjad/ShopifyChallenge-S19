import Product from './models/product';
import Cart from './models/cart';

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
            return await Product.find({
                "title" : title.toString()
            });
        },
        async getCart() {
            return await Cart.find();
        }
    },
    Mutation: {
        async createProduct(_, { input }) {
            return await Product.create(input);
        },
        async updateProduct(_, { title, input }) {
            return await Product.findOneAndUpdate({
                query: { "title": title },
                update: { input },
                new: true
            })
        },
        async deleteProduct(_, { title }) {
            return await Product.deleteMany({
                "title": title
            }).acknowledged;
        },
        async deleteAll() {
            return await Product.deleteMany().acknowledged;
        }
    }
}