import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
export default mongoose.model('product', ProductSchema);