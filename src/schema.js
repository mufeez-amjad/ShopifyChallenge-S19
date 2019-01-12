import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
type Product {
    id : ID!
    title: String!
    price: Float!
    inventory_count: Int!
}
type CartItem {
    product: Product!
    quantity: Int!
    cost: Float!
}
type Cart {
    id : ID!
    items: [CartItem!]
    total: Float!
}
type Query {
    """
    Retrieve a product by title. 
    """
    getProduct(title: String!) : Product
    """
    Retrieve a list of all products. To see only the products in stock, 
    pass in the optional parameter 'inStock: true' to only get the items that are available for purchase.
    """
    allProducts(inStock: Boolean=false): [Product]
    """
    Retrieve a cart and its contents. 
    """
    getCart: Cart
}
input ProductInput {
    title: String!
    price: Float!
    inventory_count: Int!
}
type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(title: String!, input: ProductInput) : Product
    deleteProduct(title: String!) : Boolean
    deleteAll: Boolean
}
`
export default makeExecutableSchema({
    typeDefs,
    resolvers
});