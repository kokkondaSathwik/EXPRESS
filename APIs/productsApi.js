//create a mini Express Application
const exp = require('express');
const productApp = exp.Router();

productApp.get('/products', (req, res) => {
    res.send({ message: 'List of products' });
});
productApp.post('/products', (req, res) => {
});


module.exports = productApp;