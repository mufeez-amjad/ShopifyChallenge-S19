import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
"""
A product with an associated title, price and inventory count.
"""
type Product {
    id : ID!
    title: String!
    price: Float!
    inventory_count: Int!
}
"""
A item in a cart which has a title, quantity and subTotal.
"""
type CartItem {
    title: String!
    quantity: Int!
    subTotal: Float!
}
"""
A cart that has a list of items, a total price, as well as an associated user.
"""
type Cart {
    id : ID!
    items: [CartItem!]
    total: Float
    user: String!
}
"""
A user in the marketplace.
"""
type User {
    id: ID!
    username: String!
}
"""
The MongoDB response for when an item is deleted. 'ok' represents success/failure, 'n' is the number of items deleted.
"""
type Deletion {
    ok: Int!
    n: Int!
}
type Query {
    """
    Retrieve a list of all products. To see only the products in stock, 
    pass in the optional parameter 'inStock: true' to only get the items that are available for purchase.
    """
    getAllProducts(inStock: Boolean=false): [Product]
    """
    Retrieve a product by title. 
    """
    getProduct(title: String!) : Product
    """
    Retrieve a cart and its user.
    """
    getCart(username: String!): Cart
    """
    Retrieve a list of all the users that have been created.
    """
    getUsers: [User]
}
input ProductInput {
    title: String!
    price: Float!
    inventory_count: Int!
}
input UpdateProductInput {
    title: String
    price: Float
    inventory_count: Int
}
input CartInput {
    title: String!
    quantity: Int=1
}
type Mutation {
    """
    Create a product with an associated title, price and inventory count.
    """
    createProduct(input: ProductInput!): Product
    """
    Update any one of the fields in a product.
    """
    updateProduct(title: String!, input: UpdateProductInput!): Product
    """
    Delete a single product.
    """
    deleteProduct(title: String!): Deletion
    """
    Delete all products.
    """
    deleteAll: Deletion
    """
    Purchase a product, which decreases the inventory by 1.
    """
    purchaseProduct(title: String!, quantity: Int=1): Product
    """
    Create a user with a given username.
    """
    createUser(username: String!): User
    """
    Create a cart for a given user.
    """
    createCart(username: String!): Cart
    """
    Add an item to a user's cart. The default quantity is 1 but can be set 
    explicitly using the optional parameter 'quantity: <number>'.
    """
    addToCart(username: String!, input: CartInput!): Cart
    """
    Complete a user's cart, which deletes the cart and adjusts inventory stock accordingly.
    """
    completeCart(username: String!): String
}
`
//completeCart(user: String!)


export default makeExecutableSchema({
    typeDefs,
    resolvers
});