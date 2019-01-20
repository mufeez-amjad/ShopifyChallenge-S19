'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CartSchema = new Schema({
    items: [{
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
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        ref: 'user',
        required: true
    }
});
exports.default = _mongoose2.default.model('cart', CartSchema);
//# sourceMappingURL=cart.js.map