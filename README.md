# Shopify Summer 2019 Developer Intern Challenge

I enjoyed doing the challenge because it gave me an opportunity to learn GraphQL.

## Getting Started:
The live server is deployed here: [server](https://shopify-s19.herokuapp.com).

### Object Schemas
This is my submission for the Shopify Internship Challenge Summer '19.

The requirement of the challenge was to build an online marketplace that allows products to be queried for, and purchased. This required a Product Schema:

#### Product
```
const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inventory_count: {
        type: Number,
        required: true
    }
})
```

For the optional part of the challenge we also needed to interact with carts and users who own those carts.

#### Cart

```
const CartSchema = new Schema({
      items: [
        {
            title: {
                type: String,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            subTotal: {
              type: Number,
              required: true,
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        ref: 'user',
        required: true
    }
})
```

A cart contains a list of product names, a quantity for each, a subtotal for each product, a total for the entire cart and an associated user.

#### User

```
const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      unique: true
    }
})
```
# Documentation

**The following queries and mutations are available in more depth by viewing the schema tab in the [GraphQL Playground](https://shopify-s19.herokuapp.com/).**

## Queries

For the purpose of the demo I chose to query by `title` and `username` instead of id.

The API supports the following queries:

- All products
- All products in stock
- A specific product
- A user's shopping cart
- All users

## Mutations

For the purpose of the demo I chose to mutate by `title` and `username` instead of id.

The API supports the following mutation:

- Creating a product
- Updating a product
  - can edit its `title`, `price` or `inventory_count`
- Deleting a product
- Deleting all products
- Purchasing a product
  - This was for the required portion of the challenge. It only decreases a product's `inventory_count`
- Creating a user
- Creating a cart for a given user
- Adding a product to a user's cart
- Completing a cart 


## Examples

The following commands are ready for you to try:

List all products:

```
{
  getAllProducts {
    id
    title
    price
    inventory_count
  }
}
```

List all **available** products:

```
{
  getAllProducts(inStock: true) {
    id
    title
    price
    inventory_count
  }
}
```

Retrieve a specific product:

```
{
  getProduct(title: "MacBook Pro") {
    title
    price
    inventory_count
  }
}
```

Add a product to the marketplace:

```
mutation {
  createProduct(input: {
    title: "Airpods"
    price: 259.99
    inventory_count: 1
  }) {
    title
    price
    inventory_count
  }
}
```

Update a product:

```
mutation {
  updateProduct(title: "Airpods", input: {
    inventory_count: 1
  }) {
    title
    price
    inventory_count
  }
}
```

Create a user:

```
mutation {
  createUser(username: "test") {
    username
  }
}
```

Create a shopping cart for a user:

```
mutation {
  createCart(username: "shopify") {
    id
    items {
      title
      quantity
      subTotal
    }
    total
    user
  }
}
```

Add one product to a shopping cart:

```
mutation {
  addToCart(username: "shopify", input: {
    title: "Airpods",
  }) {
    id
    items {
      title
      quantity
      subTotal
    }
    total
    user
  }
}
```

Add more than one product to a shopping cart:

```
mutation {
  addToCart(username: "shopify", input: {
    title: "Airpods",
    quantity: 2
  }) {
    id
    items {
      title
      quantity
      subTotal
    }
    total
    user
  }
}
```

Complete a cart:

```
mutation {
  completeCart(username: "shopify")
}
```