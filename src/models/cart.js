import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CartSchema = new Schema({
      items: [
        {
            product: {
                type: Schema.Types.ObjectId,
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
})
export default mongoose.model('cart', CartSchema);