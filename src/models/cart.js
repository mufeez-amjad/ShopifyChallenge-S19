import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CartSchema = new Schema({
      items: [
        {
            product: {
                type: String,
                ref: "product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            cost: {
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
        ref: "user",
        required: true
    }
})
export default mongoose.model('cart', CartSchema);