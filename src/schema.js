import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
type Product {
    id : ID!
    title: String!
    price: Float!
    inventory_count: Int!
}
type Query {
    getProduct(title: String!) : Product
    allProducts(inStock: Boolean): [Product]
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