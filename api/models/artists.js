import { Schema, model } from 'mongoose';

const productSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true }
});

export default model('Product', productSchema);