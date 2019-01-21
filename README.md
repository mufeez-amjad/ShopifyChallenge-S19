# Shopify Summer 2019 Developer Intern Challenge

This is my submission for the Summer 2019 Shopify Challenge. I really enjoyed doing it because it gave me an opportunity to learn GraphQL and also brush up on some of my backend knowledge.

## Getting Started:
The live server is deployed here: [server](https://shopify-s19.herokuapp.com).

Alternatively, to run the server locally:
1. clone the repo
2. run `npm install`
3. run `npm run build && npm start`
4. navigate to `http://localhost:4000` to interact with GraphQL Playground

### Object Schemas

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

For the optional part of the challenge we also needed to interact with carts and users who own those carts. This required a Cart and User Schema:

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

**The following documentation regarding queries and mutations is available in more depth by viewing the schema tab in the [GraphQL Playground](https://shopify-s19.herokuapp.com/).**

## Queries

For the purpose of the demo I chose to query by `title` and `username` instead of id.

The API supports the following queries:

| Query         | Parameters                                                                                   | Operation         |
|---------------|----------------------------------------------------------------------------------------------|-------------------|
| getAllProducts | **Optional** `inStock`: Boolean  | Returns either all products or only the ones in stock  |
| getProduct | `title`: String  | Returns a specific product |
| getCart | `username`: String | Returns the cart of a specified user |
## Mutations

For the purpose of the demo I chose to mutate by `title` and `username` instead of id.

The API supports the following mutations:

| Mutation      | Parameters                                                                                   | Operation         |
|---------------|----------------------------------------------------------------------------------------------|-------------------|
| createProduct | `input` : {<br > `title` : String,<br > `price` : Float,<br > `inventory_count` : Int<br > } | Creates a product |
| updateProduct | `title`: String <br><br> `input`: {<br> `title`: String,<br> `price`: Float,<br> `inventory_count`: Int<br> }  | Updates an existing product |
| deleteProduct | `title`: String | Deletes the specified product |
| deleteAll | none | Deletes all products |
| purchaseProduct | `title`: String <br> **Optional** `quantity`: Int | Decreases `inventory_count` by `quantity` or 1 if not specified |
| createUser | `username`: String | Creates a user |
| createCart | `username`: String | Creates a cart for a specified user |
| addToCart | `username`: String <br> <br>  `input`: {<br> `title`: String,<br>`quantity`: Int <br> } | Adds specified product(s) to cart |
| completeCart | `username`: String | Completes a cart |

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
    inventory_count: 0
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
  createUser(username: "shopify") {
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

Add **one** product to a shopping cart:

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

Add **more than one** product to a shopping cart:

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

Delete all products:

```
mutation {
  deleteAll {
    ok
    n
  }
}
```

Delete a single product:

```
mutation {
  deleteProduct(title: "MacBook Pro") {
    ok
    n
  }
}
```
