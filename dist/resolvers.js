'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resolvers = undefined;

var _product = require('./models/product');

var _product2 = _interopRequireDefault(_product);

var _cart = require('./models/cart');

var _cart2 = _interopRequireDefault(_cart);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

var _apolloServer = require('apollo-server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var resolvers = exports.resolvers = {
    Query: {
        getAllProducts: function getAllProducts(_, _ref) {
            var _this = this;

            var inStock = _ref.inStock;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (inStock) {
                                    _context.next = 6;
                                    break;
                                }

                                _context.next = 3;
                                return _product2.default.find();

                            case 3:
                                return _context.abrupt('return', _context.sent);

                            case 6:
                                _context.next = 8;
                                return _product2.default.find({
                                    "inventory_count": { $gt: 0 }
                                });

                            case 8:
                                return _context.abrupt('return', _context.sent);

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }))();
        },
        getProduct: function getProduct(_, _ref2) {
            var _this2 = this;

            var title = _ref2.title;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var query;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                query = { title: title };
                                _context2.next = 3;
                                return _product2.default.findOne(query).then(function (doc) {
                                    //TODO: fix error with error
                                    if (!doc) {
                                        throw new _apolloServer.ApolloError("The product does not exist!");
                                    }

                                    return doc;
                                });

                            case 3:
                                return _context2.abrupt('return', _context2.sent);

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2);
            }))();
        },
        getCart: function getCart(_, _ref3) {
            var _this3 = this;

            var username = _ref3.username;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var query;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                query = { user: username };
                                _context3.next = 3;
                                return _cart2.default.findOne(query).then(function (doc) {
                                    if (!doc) {
                                        throw new _apolloServer.ApolloError('There is no cart for ' + username + '.');
                                    }
                                });

                            case 3:
                                return _context3.abrupt('return', _context3.sent);

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this3);
            }))();
        },
        getUsers: function getUsers() {
            var _this4 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return _user2.default.find();

                            case 2:
                                return _context4.abrupt('return', _context4.sent);

                            case 3:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this4);
            }))();
        }
    },
    Mutation: {
        createProduct: function createProduct(_, _ref4) {
            var _this5 = this;

            var input = _ref4.input;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return _product2.default.create(input);

                            case 2:
                                return _context5.abrupt('return', _context5.sent);

                            case 3:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, _this5);
            }))();
        },
        updateProduct: function updateProduct(_, _ref5) {
            var _this6 = this;

            var title = _ref5.title,
                input = _ref5.input;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var query;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                query = { title: title };

                                console.log(input);
                                _context6.next = 4;
                                return _product2.default.findOneAndUpdate(query, input, { new: true }, function (error, doc) {
                                    if (error) {
                                        throw new _apolloServer.ApolloError("There was an error updating the product!");
                                    }
                                    if (!doc) {
                                        throw new _apolloServer.ApolloError("That product does not exist!");
                                    } else {
                                        return doc;
                                    }
                                });

                            case 4:
                                return _context6.abrupt('return', _context6.sent);

                            case 5:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, _this6);
            }))();
        },
        purchaseProduct: function purchaseProduct(_, _ref6) {
            var _this7 = this;

            var title = _ref6.title,
                quantity = _ref6.quantity;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var query, result;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                query = { title: title };
                                _context7.next = 3;
                                return _product2.default.findOne(query);

                            case 3:
                                result = _context7.sent;

                                if (result) {
                                    _context7.next = 6;
                                    break;
                                }

                                throw new _apolloServer.ApolloError("This item does not exist!");

                            case 6:
                                if (!(result.inventory_count <= 0)) {
                                    _context7.next = 10;
                                    break;
                                }

                                throw new _apolloServer.ApolloError("This item is out of stock!");

                            case 10:
                                _context7.next = 12;
                                return _product2.default.update(query, {
                                    $inc: { inventory_count: -quantity }
                                });

                            case 12:
                                return _context7.abrupt('return', _context7.sent);

                            case 13:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, _this7);
            }))();
        },
        deleteProduct: function deleteProduct(_, _ref7) {
            var _this8 = this;

            var title = _ref7.title;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var query;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                query = { title: title };
                                _context8.next = 3;
                                return _product2.default.deleteMany(query);

                            case 3:
                                return _context8.abrupt('return', _context8.sent);

                            case 4:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, _this8);
            }))();
        },
        deleteAll: function deleteAll() {
            var _this9 = this;

            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return _product2.default.remove({});

                            case 2:
                                return _context9.abrupt('return', _context9.sent);

                            case 3:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, _this9);
            }))();
        },
        createUser: function createUser(_, _ref8) {
            var _this10 = this;

            var input = _ref8.input;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return _user2.default.create(input);

                            case 2:
                                return _context10.abrupt('return', _context10.sent);

                            case 3:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, _this10);
            }))();
        },
        createCart: function createCart(_, _ref9) {
            var _this11 = this;

            var username = _ref9.username;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                var query, user;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                query = { username: username };
                                _context11.next = 3;
                                return _user2.default.findOne(query);

                            case 3:
                                user = _context11.sent;

                                if (user) {
                                    _context11.next = 6;
                                    break;
                                }

                                throw new _apolloServer.ApolloError("No such user exists!");

                            case 6:
                                _context11.next = 8;
                                return _cart2.default.create({
                                    user: username
                                });

                            case 8:
                                return _context11.abrupt('return', _context11.sent);

                            case 9:
                            case 'end':
                                return _context11.stop();
                        }
                    }
                }, _callee11, _this11);
            }))();
        },
        addToCart: function addToCart(_, _ref10) {
            var _this12 = this;

            var username = _ref10.username,
                input = _ref10.input;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                var productQuery, _ref11, price, inventory_count, subTotal, query;

                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                productQuery = { title: input.title.toString() };
                                _context12.next = 3;
                                return _product2.default.findOne(productQuery);

                            case 3:
                                _ref11 = _context12.sent;
                                price = _ref11.price;
                                inventory_count = _ref11.inventory_count;
                                subTotal = price * input.quantity;
                                query = { user: username };

                                if (!(inventory_count <= 0)) {
                                    _context12.next = 10;
                                    break;
                                }

                                throw new _apolloServer.ApolloError("This item is out of stock!");

                            case 10:
                                if (!(input.quantity > inventory_count)) {
                                    _context12.next = 12;
                                    break;
                                }

                                throw new _apolloServer.ApolloError('There is only ' + inventory_count + ' left in stock!');

                            case 12:
                                _context12.next = 14;
                                return _cart2.default.findOneAndUpdate(query, {
                                    $push: {
                                        items: {
                                            title: input.title,
                                            quantity: input.quantity,
                                            subTotal: subTotal
                                        }
                                    },
                                    $inc: { total: subTotal }
                                });

                            case 14:
                                return _context12.abrupt('return', _context12.sent);

                            case 15:
                            case 'end':
                                return _context12.stop();
                        }
                    }
                }, _callee12, _this12);
            }))();
        },
        completeCart: function completeCart(_, _ref12) {
            var _this13 = this;

            var username = _ref12.username;
            return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
                var query, cart, items, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, total;

                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                query = { user: username };
                                _context13.next = 3;
                                return _cart2.default.findOne(query);

                            case 3:
                                cart = _context13.sent;

                                if (cart) {
                                    _context13.next = 6;
                                    break;
                                }

                                throw new _apolloServer.ApolloError("Cart does not exist!");

                            case 6:
                                items = cart.items;

                                if (items.length) {
                                    _context13.next = 9;
                                    break;
                                }

                                throw new _apolloServer.ApolloError("Cannot complete an empty cart!");

                            case 9:
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context13.prev = 12;
                                _iterator = items[Symbol.iterator]();

                            case 14:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context13.next = 21;
                                    break;
                                }

                                item = _step.value;
                                _context13.next = 18;
                                return _product2.default.findOneAndUpdate({ title: item.title }, {
                                    $inc: { inventory_count: -item.quantity }
                                });

                            case 18:
                                _iteratorNormalCompletion = true;
                                _context13.next = 14;
                                break;

                            case 21:
                                _context13.next = 27;
                                break;

                            case 23:
                                _context13.prev = 23;
                                _context13.t0 = _context13['catch'](12);
                                _didIteratorError = true;
                                _iteratorError = _context13.t0;

                            case 27:
                                _context13.prev = 27;
                                _context13.prev = 28;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 30:
                                _context13.prev = 30;

                                if (!_didIteratorError) {
                                    _context13.next = 33;
                                    break;
                                }

                                throw _iteratorError;

                            case 33:
                                return _context13.finish(30);

                            case 34:
                                return _context13.finish(27);

                            case 35:
                                total = cart.total;

                                cart.remove();

                                return _context13.abrupt('return', 'Cart completed successfully, total was: $' + total);

                            case 38:
                            case 'end':
                                return _context13.stop();
                        }
                    }
                }, _callee13, _this13, [[12, 23, 27, 35], [28,, 30, 34]]);
            }))();
        }
    }
};
//# sourceMappingURL=resolvers.js.map