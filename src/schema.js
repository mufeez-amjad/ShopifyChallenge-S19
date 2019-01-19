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
    title: String!
    quantity: Int!
    subTotal: Float!
}
type Cart {
    id : ID!
    items: [CartItem!]
    total: Float!
    user: String!
}
type User {
    id: ID!
    username: String!
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
    getCart(username: String!): Cart
    getUsers: [User]
}
input ProductInput {
    title: String!
    price: Float!
    inventory_count: Int!
}
input CartInput {
    title: String!
    quantity: Int
}
input UserInput {
    username: String!
}
type Mutation {
    createProduct(input: ProductInput): Product
    updateProduct(title: String!, input: ProductInput): Product
    deleteProduct(title: String!): Boolean
    purchaseProduct(title: String!, quantity: Int=1): Product
    deleteAll: Int
    createUser(input: UserInput!): User
    createCart(username: String!): Cart
    addToCart(username: String!, input: CartInput): Cart
}
`
//completeCart(user: String!)


export default makeExecutableSchema({
    typeDefs,
    resolvers
});