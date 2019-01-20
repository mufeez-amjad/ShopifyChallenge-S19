import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
        default: 0
    },
    user: {
        type: String,
        ref: 'user',
        required: true
    }
})
export default mongoose.model('cart', CartSchema);